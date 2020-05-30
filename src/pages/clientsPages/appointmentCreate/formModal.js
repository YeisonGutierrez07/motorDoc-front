import React, { Component } from "react";
import {
  Button,
  Modal,
  Table,
  Select,
  notification,
  Icon,
  Popconfirm,
  DatePicker,
  Alert
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import { getAllRoutinesByWorkShopID } from "../../../services/routines";

const { Option } = Select;
const { confirm } = Modal;

const columns = [
  {
    title: "Nombre de la rutina",
    dataIndex: "routines.routine.name",
    key: "name"
  },
  {
    title: "Tiempo estimado",
    dataIndex: "routines.estimated_time",
    render: time => (
      <p>
        <Moment format="HH:mm">{Number(time)}</Moment> &nbsp;&nbsp;Horas{" "}
      </p>
    ),
    key: "estimated_time"
  },
  {
    title: "Costo estimado",
    dataIndex: "routines.cost",
    render: time => `$ ${time}`,
    key: "estimated_time"
  }
];

export default class ModalCreateAppointment extends Component {
  state = {
    routinesTable: [],
    routines: [],
    finish: false,
    routinesService: [],
    totalCost: 0,
    totalTime: 0
  };

  componentDidUpdate(nextProps) {
    const { workShopID } = this.props;
    if (workShopID !== nextProps.workShopID) {
      this.searchRoutines(workShopID);
    }
  }

  searchRoutines = workShopID => {
    getAllRoutinesByWorkShopID(workShopID).then(routines =>
      this.setState({ routines })
    );
  };

  returnList = () => {
    const { routinesTable } = this.state;
    if (routinesTable.length >= 1) {
      return (
        <>
          <br />
          <h3>
            <p style={{ color: "red" }}>Rutinas</p>
          </h3>
          <Table
            dataSource={routinesTable}
            columns={columns}
            pagination={routinesTable.length >= 11}
          />
        </>
      );
    }
    return null;
  };

  addRoutine = () => {
    const { selectRoutine, routines, routinesTable } = this.state;

    if (!selectRoutine) {
      notification.error({
        message: "Error",
        description: "Debe agregar información en los dos campos"
      });
      return;
    }

    const routineData = routines.filter(r => r.routine_id === selectRoutine)[0];

    routinesTable.push({ routines: routineData });

    this.setState({
      routinesTable,
      selectRoutine: null
    });
  };

  onChangeSelect = val => this.setState({ selectRoutine: val });

  onChangeVehicleUse = vehicleUse => this.setState({ vehicleUse });

  setFinish = () => {
    const { routinesTable } = this.state;
    let { totalCost, totalTime } = this.state;
    if (routinesTable.length > 0) {
      const routinesService = [];
      routinesTable.forEach(r => {
        routinesService.push({
          routine_id: r.routines.routine.id,
          estimated_time: r.routines.estimated_time,
          cost: r.routines.cost
        });
        totalCost += Number(r.routines.cost);
        totalTime += Number(r.routines.estimatedTime);
      });

      this.setState({ finish: true, routinesService, totalCost, totalTime });
    } else {
      notification.warning({
        message: "Error",
        description: "No tiene rutinas asignadas"
      });
    }
  };

  sentToServer = () => {
    const { routinesService, vehicleUse, totalCost, totalTime } = this.state;
    const { handleSubmit } = this.props;

    const dataServer = {
      vehicle_id: vehicleUse,
      routine: routinesService,
      total_cost: totalCost,
      total_time: totalTime
    };
    console.info(dataServer);

    return confirm({
      title: "Disculpanos",
      content: "Esta funcionalidad aun se encuentra en fase de desarrollo",
      onOk() {
        handleSubmit();
      },
      onCancel() {}
    });
  };

  footerModal = () => {
    const { finish } = this.state;

    if (finish) {
      return [
        <div align="center" key="footer">
          <Popconfirm
            title="¿Esta seguro de agendar una cita con esté taller?"
            onConfirm={() => this.sentToServer()}
            okText="Si"
            cancelText="No"
          >
            <Button key="submit" type="primary">
              Agendar Cita
            </Button>
          </Popconfirm>
        </div>
      ];
    }
    return [
      <div align="center" key="footer">
        <Button key="submit" type="primary" onClick={() => this.setFinish()}>
          Continuar
        </Button>
      </div>
    ];
  };

  onChangeDataPicker = (value, dateString) => {
    console.info(value, dateString);
  };

  returnFormRoutines = () => {
    const {
      routines,
      selectRoutine,
      finish,
      vehicleUse,
      totalCost
    } = this.state;
    const { vehicles } = this.props;
    const disabledDate = current => current && current < moment().endOf("day");

    if (finish) {
      return (
        <>
          <b>Seleccione el vehículo para su mantenimiento</b>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Seleccione el vehículo"
            optionFilterProp="children"
            onChange={this.onChangeVehicleUse}
            value={vehicleUse}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {Object.keys(vehicles).map(c => (
              <Option key={vehicles[c].id} value={vehicles[c].id}>
                {vehicles[c].reference}
              </Option>
            ))}
          </Select>
          <br />
          <br />
          <b>Seleccione la fecha y la hora:</b>
          <br />
          <DatePicker
            placeholder="Seleccione la fecha"
            disabledDate={disabledDate}
            showTime
            style={{ width: "100%" }}
            onChange={this.onChangeDataPicker}
          />

          <br />
          <br />
          {/* <Alert
            message={<p><b>Tiempo estimado promedio:&nbsp;&nbsp;</b><Moment format="HH:mm">{Number(totalTime)}</Moment></p>}
            type="success"
          /> */}
          <Alert
            message={
              <p>
                <b>Costo Total: </b>&nbsp;&nbsp;${totalCost}
              </p>
            }
            type="success"
          />
        </>
      );
    }
    return (
      <>
        <b>Seleccione las rutinas para su mantenimiento</b>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Seleccione la rutina"
          optionFilterProp="children"
          onChange={this.onChangeSelect}
          value={selectRoutine}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {Object.keys(routines).map(c => (
            <Option key={routines[c].id} value={routines[c].routine.id}>
              {routines[c].routine.name}
            </Option>
          ))}
        </Select>
        <br />
        <br />
        <div align="center">
          <Button size="small" onClick={() => this.addRoutine()}>
            <Icon type="plus" />
            Agregar
          </Button>
          <br />
          <br />
        </div>
        {this.returnList()}
      </>
    );
  };

  render() {
    const { visible, handleSubmit, handleCancel } = this.props;
    return (
      <Modal
        title="Agendar cita"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={this.footerModal()}
      >
        {this.returnFormRoutines()}
      </Modal>
    );
  }
}
