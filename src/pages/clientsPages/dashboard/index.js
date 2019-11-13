/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "antd";

@connect(({ user }) => ({ user }))
export default class dashboard extends Component {
  render() {
    const { user, history } = this.props;
    return (
      <>
        <h2>
          <b>Bienvenido(a)</b>
          {user.name}
        </h2>
        <h4>
          En MotorDoc puedes agendar tus citas y contactar a tus mecanicos de
          una manera rapida y eficiente
        </h4>
        <br />
        <Row gutter={20}>
          <Col md={8} xs={8}>
            <Card
              title="Talleres"
              extra={
                <a onClick={() => history.push("/clientsPages/workshpsList")}>
                  Saber mas
                </a>
              }
              style={{ width: "100%" }}
            >
              <img
                style={{ width: "100%" }}
                src="https://cdn.wallapop.com/images/10420/5o/l8/__/c10420p343632096/i799048016.jpg?pictureSize=W640"
                alt=""
              />
            </Card>
          </Col>
          <Col md={8} xs={8}>
            <Card
              title="Contacta a un mecanico"
              extra={
                <a onClick={() => history.push("/globals/MessagingChat")}>
                  Saber mas
                </a>
              }
              style={{ width: "100%" }}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.soy502.com/sites/default/files/styles/mobile_full_node/public/2019/Jun/12/64317307_429340061180650_2606947579899936768_n_1.jpg"
                alt=""
              />
            </Card>
          </Col>
          <Col md={8} xs={8}>
            <Card
              title="Mis citas"
              extra={
                <a
                  onClick={() =>
                    history.push("/clientsPages/appointmentCalendar")
                  }
                >
                  Saber mas
                </a>
              }
              style={{ width: "100%" }}
            >
              <img
                style={{ width: "100%" }}
                src="https://www.miracorredor.tv/wp-content/uploads/2019/09/calendario-.001.jpeg"
                alt=""
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
