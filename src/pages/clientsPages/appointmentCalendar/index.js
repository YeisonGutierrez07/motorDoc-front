import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Calendar, Badge, Row, Col, Button } from "antd";

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [{ type: "success", content: "Cita asignada" }];
      break;
    case 10:
      listData = [{ type: "success", content: "Cita asignada" }];
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
export default class appointmentCalendar extends Component {
  render() {
    const { history } = this.props;
    return (
      <Authorize roles={["CLIENT"]} redirect to="/404">
        <Helmet title="Talleres" />
        <div className="card">
          <div className="card-body">
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
                      onClick={() => history.push("/clientsPages/workshpsList")}
                      type="primary"
                      icon="calendar"
                    >
                      Agendar Cita
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button icon="redo">Regargar</Button>
                    <Calendar
                      dateCellRender={dateCellRender}
                      monthCellRender={monthCellRender}
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
