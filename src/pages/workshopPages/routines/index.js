/* eslint-disable import/no-named-as-default */
import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import {
  Row,
  Col,
  Button,
  Modal,
  Table,
  Select,
  notification,
  InputNumber,
  Icon,
  TimePicker
} from "antd";
import moment from "moment";
import {
  getAllRoutines,
  getAllRoutinesByWorkShop,
  addRoutineToWorkShop
} from "../../../services/routines";

const { confirm } = Modal;
const { Option } = Select;

class ViewRoutines extends React.Component {
  state = {
    misRoutines: [],
    routines: [],
    newRoutines: [],
    routinesTable: [],
    visible: false,
    estimatedTime: null,
    selectRoutine: null,
    estimatedCost: null
  };

  componentDidMount() {
    this.stategetAllRoutinesByWorkShop();
    getAllRoutines().then(routines => {
      this.setState({ routines });
    });
  }

  stategetAllRoutinesByWorkShop = () => {
    getAllRoutinesByWorkShop().then(misRoutines => {
      this.setState({ misRoutines });
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      routinesTable: []
    });
  };

  handleSubmit = () => {
    const { newRoutines } = this.state;
    if (newRoutines.length === 0) {
      notification.error({
        message: "Error",
        description:
          "Usted no ha agregado ninguna opción, para salir oprima cancelar."
      });
      return;
    }
    const sendData = () => {
      addRoutineToWorkShop(newRoutines).then(data => {
        this.setState({
          visible: false,
          misRoutines: data
        });
        notification.success({
          message: "Exito",
          description: "Se han agregado las rutinas con exito"
        });
      });
    };

    confirm({
      title: "¿Seguro de agregar estas rutinas a su listado?",
      content: "Recuerde que seran vistas desde el perfil de sus clientes",
      onOk() {
        sendData();
      },
      onCancel() {
        this.handleCancel();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      misRoutines,
      routines,
      visible,
      routinesTable,
      estimatedTime,
      selectRoutine,
      estimatedCost
    } = this.state;

    const columns = [
      {
        title: "Nombre de la rutina",
        dataIndex: "routine.name",
        key: "name"
      },
      {
        title: "Tiempo estimado",
        dataIndex: "estimated_time",
        render: time => `${time} Horas`,
        key: "estimated_time"
      },
      {
        title: "Costo estimado",
        dataIndex: "estimated_cost",
        render: time => `$ ${time}`,
        key: "estimated_time"
      }
    ];
    const addRoutine = () => {
      const { newRoutines } = this.state;
      const newRoutinesObj = {
        routine_id: selectRoutine,
        estimated_time: estimatedTime,
        estimated_cost: estimatedCost
      };
      if (!selectRoutine || !estimatedTime) {
        notification.error({
          message: "Error",
          description: "Debe agregar información en los dos campos"
        });
        return;
      }

      const routineData = routines.filter(r => r.id === selectRoutine)[0];
      const routinesTableObj = {
        routine: routineData,
        estimated_time: estimatedTime,
        estimated_cost: estimatedCost
      };
      newRoutines.push(newRoutinesObj);
      routinesTable.push(routinesTableObj);

      this.setState({
        newRoutines,
        routinesTable,
        selectRoutine: null,
        estimatedTime: null,
        estimatedCost: null
      });
    };

    const onChangeSelect = val => {
      this.setState({
        selectRoutine: val
      });
    };

    const onChangeHours = (time, timeString) => {
      console.log(time, timeString);

      this.setState({
        estimatedTime: timeString
      });
    };

    const onChangeCost = val => {
      this.setState({
        estimatedCost: val.toString()
      });
    };

    const returnList = () => {
      if (routinesTable.length >= 1) {
        return (
          <>
            <br />
            <h3>
              <p style={{ color: "red" }}>Nuevas rutinas</p>
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
    return (
      <Authorize roles={["WORKSHOP"]} redirect to="/404">
        <Helmet title="Principal" />
        <Modal
          title="Agregar rutinas"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <>
            <b>Seleccione las rutinas para agregar a su listado</b>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Seleccione la rutina"
              optionFilterProp="children"
              onChange={onChangeSelect}
              value={selectRoutine}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {Object.keys(routines).map(c => (
                <Option key={routines[c].id} value={routines[c].id}>
                  {routines[c].name}
                </Option>
              ))}
            </Select>
            <br />
            <br />
            <b>Tiempo estimado</b>(en horas)<b>:</b>
            <TimePicker
              onChange={onChangeHours}
              defaultOpenValue={moment("00:00", "HH:mm")}
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <b>Valor</b>(en dinero)<b>:</b>
            <InputNumber
              min={1}
              onChange={onChangeCost}
              value={estimatedCost}
              style={{ width: "100%" }}
            />
            <br />
            <br />
            <div align="center">
              <Button size="small" onClick={() => addRoutine()}>
                <Icon type="plus" />
                Agregar
              </Button>
              <br />
              <br />
            </div>
            {returnList()}
          </>
        </Modal>
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="utils__title">
                    <h2 style={{ color: "red" }}>
                      Listado de rutinas que ofrece su taller
                    </h2>
                  </div>
                  <div className="card-body">
                    <div align="right">
                      <Button type="primary" onClick={this.showModal}>
                        Agregar rutina
                      </Button>
                    </div>
                    <Table
                      dataSource={misRoutines}
                      columns={columns}
                      pagination={misRoutines.length >= 11}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

export default ViewRoutines;
