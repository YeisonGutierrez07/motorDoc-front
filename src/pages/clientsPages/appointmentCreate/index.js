/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import {
  Calendar,
  Badge,
  Row,
  Col,
  Button,
  Modal,
  Form,
  TimePicker,
  Select,
  Input,
  notification
} from "antd";
import Moment from "react-moment";
import moment from "moment";
import { searchWorkShopService } from "../../../services/workshops";
import { GetAllVehicles } from "../../../services/vehicles";
import { getAllRoutinesByWorkShopID } from "../../../services/routines";
import ModalCreateAppointment from "./formModal";

const { Option } = Select;
const { TextArea } = Input;

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "Cita presencial" },
        { type: "success", content: "Cita general" }
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Cita presencial" },
        { type: "success", content: "Cita general" },
        { type: "error", content: "No se completo" }
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
  return 0;
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

@Form.create()
export default class appointmentCalendar extends Component {
  state = {
    visible: false,
    dateSelect: "",
    workShopData: {},
    vehicles: [],
    routines: [],
    timeString: "",
    routinesTimeEstimed: "",
    routinesCostTime: "",
    createAppointment: false,
    workShopID: 0
  };

  componentDidMount() {
    const { match } = this.props;

    this.setState({ workShopID: match.params.idWorkShop });
    searchWorkShopService(match.params.idWorkShop).then(response =>
      this.setState({ workShopData: response })
    );
    GetAllVehicles().then(vehicles => this.setState({ vehicles }));

    getAllRoutinesByWorkShopID(match.params.idWorkShop).then(routines =>
      this.setState({ routines })
    );
  }

  onChangeTime = (time, timeString) => {
    this.setState({
      timeString
    });
  };

  onChangeCalender = value => {
    const date = new Date(value);
    this.setState({
      dateSelect: date,
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  ChangeRoutines = selectArray => {
    const { routines } = this.state;
    let routinesTimeEstimed = 0;
    let routinesCostTime = 0;
    selectArray.forEach(element => {
      const routinesSelect = routines.filter(r => r.routine.id === element)[0];
      routinesTimeEstimed += Number(routinesSelect.estimated_time);
      routinesCostTime += Number(routinesSelect.estimated_cost);
    });
    this.setState({
      routinesTimeEstimed,
      routinesCostTime
    });
  };

  createApointment = () => {
    const { vehicles } = this.state;

    if (vehicles.length > 0) {
      return this.setState({ createAppointment: true });
    }
    return notification.warning({
      message: "Alerta",
      description: "Aun no cuentas con un vehiculo al cual asignar la cita"
    });
  };

  render() {
    const { form } = this.props;
    const {
      visible,
      workShopData,
      dateSelect,
      vehicles,
      timeString,
      routines,
      routinesTimeEstimed,
      routinesCostTime,
      createAppointment,
      workShopID
    } = this.state;

    const routinesCostTimeFunc = () => {
      if (routinesTimeEstimed !== "") {
        return (
          <>
            <h4>Tiempo Estimado: {routinesTimeEstimed} Horas</h4>
            <h4>Valor Estimado: {routinesCostTime} Horas</h4>
          </>
        );
      }
      return null;
    };
    return (
      <Authorize roles={["CLIENT"]} redirect to="/404">
        <Helmet title="Talleres" />
        <ModalCreateAppointment
          visible={createAppointment}
          handleSubmit={() => this.setState({ createAppointment: false })}
          handleCancel={() => this.setState({ createAppointment: false })}
          workShopID={workShopID}
          vehicles={vehicles}
        />
        <div className="card">
          <div className="card-body">
            <Modal
              title="Agendar cita con este taller"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <>
                <div
                  style={{
                    background: "#c0c9ce",
                    padding: "30px",
                    borderRadius: "5px"
                  }}
                >
                  <div>
                    <div align="center">
                      <h2>
                        <p style={{ color: "red" }}>{workShopData.name}</p>
                      </h2>
                      <img
                        width="200"
                        height="120"
                        src={workShopData.logo}
                        alt="User"
                      />
                    </div>
                  </div>
                </div>
                <h2>
                  Fecha y Hora de la cita:{" "}
                  <Moment format="DD/MM/YYYY">{dateSelect}</Moment>{" "}
                  {timeString !== "" ? <>a las {timeString}</> : ""}
                </h2>
                <Form layout="vertical" onSubmit={this.onSubmit}>
                  <Row gutter={20}>
                    <Col md={12} xs={24}>
                      <Form.Item label="Reference">
                        {form.getFieldDecorator("reference", {
                          initialValue: "",
                          rules: [
                            {
                              required: true,
                              message: "¡Por favor seleccione la marca!"
                            }
                          ]
                        })(
                          <Select
                            style={{ width: "100%" }}
                            placeholder="Seleccione el vehiculo"
                            optionFilterProp="children"
                          >
                            {Object.keys(vehicles).map(c => (
                              <Option key={c} value={vehicles[c].id}>
                                {vehicles[c].reference}-{vehicles[c].model}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item label="Hora">
                        {form.getFieldDecorator("hour", {
                          initialValue: "",
                          rules: [
                            {
                              required: true,
                              message: "¡Por favor ingrese el modelo!"
                            }
                          ]
                        })(
                          <TimePicker
                            style={{ width: "100%" }}
                            onChange={this.onChangeTime}
                            defaultOpenValue={moment("00:00", "HH:mm")}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Rutinas">
                    {form.getFieldDecorator("routines", {
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor seleccione las rutinas!"
                        }
                      ]
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Seleccione las rutinas"
                        optionFilterProp="children"
                        onChange={this.ChangeRoutines}
                      >
                        {Object.keys(routines).map(c => (
                          <Option key={c} value={routines[c].routine.id}>
                            {routines[c].routine.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                  {routinesCostTimeFunc()}
                  <Form.Item label="Estado-Descripción">
                    {form.getFieldDecorator("estado", {
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "¡Por favor ingrese una descripción!"
                        }
                      ]
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Form>
              </>
            </Modal>
            <Row>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="utils__title">
                          <h4 style={{ color: "red" }}>Calendario de citas</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Button
                      onClick={() => this.createApointment()}
                      type="primary"
                      icon="calendar"
                    >
                      Agendar Cita
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button icon="redo">Recargar</Button>
                    <Calendar
                      dateCellRender={dateCellRender}
                      monthCellRender={monthCellRender}
                      onSelect={this.onChangeCalender}
                    />
                  </div>
                  <br />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}
