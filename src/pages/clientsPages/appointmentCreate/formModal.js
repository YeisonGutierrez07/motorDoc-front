import React, { Component } from "react";
import {
  Button,
  Modal,
  Table,
  Select,
  notification,
  Icon,
  Popconfirm
} from "antd";
import { getAllRoutinesByWorkShopID } from "../../../services/routines";

const { Option } = Select;

const columns = [
  {
    title: "Nombre de la rutina",
    dataIndex: "routines.routine.name",
    key: "name"
  },
  {
    title: "Tiempo estimado",
    dataIndex: "routines.estimated_time",
    render: time => `${time} Horas`,
    key: "estimated_time"
  },
  {
    title: "Costo estimado",
    dataIndex: "routines.estimated_cost",
    render: time => `$ ${time}`,
    key: "estimated_time"
  }
];

export default class ModalCreateAppointment extends Component {
  state = {
    routinesTable: [],
    routines: [],
    finish: false,
    routinesService: []
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

  setFinish = () => {
    const { routinesTable } = this.state;
    if (routinesTable.length > 0) {
      const routinesService = [];
      routinesTable.forEach(r => {
        routinesService.push(r.routines.routine.id);
      });

      this.setState({ finish: true, routinesService });
    } else {
      notification.warning({
        message: "Error",
        description: "No tiene rutinas asignadas"
      });
    }
  };

  footerModal = () => {
    const { finish, routinesService } = this.state;
    const { handleSubmit } = this.props;

    if (finish) {
      return [
        <div align="center" key="footer">
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => handleSubmit(routinesService)}
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

  render() {
    const { routines, selectRoutine } = this.state;
    const { visible, handleSubmit, handleCancel } = this.props;
    return (
      <Modal
        title="Agendar cita"
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={this.footerModal()}
      >
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
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
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
      </Modal>
    );
  }
}
