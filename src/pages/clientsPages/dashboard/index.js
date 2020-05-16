/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Col, Row } from "antd";
import "./styles.scss";

@connect(({ user }) => ({ user }))
export default class dashboard extends Component {
  render() {
    const { user, history } = this.props;
    return (
      <>
        <h2 style={{ color: "red" }}>
          <b>Bienvenido(a)</b>
          {user.name}
        </h2>
        <h4>
          En MotorDoc puedes agendar tus citas y contactar a tus mecanicos de
          una manera rapida y eficiente
        </h4>
        <br />
        <Row gutter={20}>
          <Col lg={8} md={12} xs={24}>
            <Card
              title={<h3 style={{color: 'red'}}>Talleres</h3>}
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
          <Col lg={8} md={12} xs={24}>
            <Card
              title={<h3 style={{color: 'red'}}>Contacta a un mecanico</h3>}
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
          <Col lg={8} md={12} xs={24}>
            <Card
              title={<h3 style={{color: 'red'}}>Mis citas</h3>}
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
        <br />
        <h1 style={{ color: "red" }} align="center"><b>Últimas noticias</b></h1>
        <br />
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <div align="center"> <h2 style={{ color: "red" }}> La Feria de las 2 ruedas del 2020 no sera igual a las pasadas</h2></div>
              <br />
              <div align="center">
                <Col lg={8} md={12} xs={24}>
                  <iframe width="350" height="315" src="https://www.youtube.com/embed/lJEJVkexc-E" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
                </Col>
                <Col lg={8} md={12} xs={24}>
                  El evento que va del 2 al 5 de mayo (2 y 3 para prensa; 4 y 5 para público en general) en el centro de convenciones Plaza Mayor, contará con los lanzamientos de las firmas Victory, KTM, y Bajaj (Victory Flow, KTM 790 Adventure, KTM 790 Adventure R y Bajaj con las ediciones especiales de Pulsarmanía); por su parte Husqvarna, Kawasaki y Kymco exhibirán su portafolio actualizado. En movilidad eléctrica, Stärker anunció que lanzará una de las motocicletas eléctricas más potentes del mundo, denominada SuperSoco TC Max. Auteco ofrecerá también toda su gama de accesorios.
                  <br /><br /><br />
                  Conoce mas en <a href="https://www.motor.com.co/actualidad/lanzamientos/novedades-auteco-feria-2-ruedas/32234">https://www.motor.com.co/</a>
                </Col>
                <Col lg={8} md={12} xs={24}>
                  <iframe width="350" height="315" src="https://www.youtube.com/embed/x1jasfwI42c" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
                </Col>
              </div>
            </Row>
          </div>
        </div>
      </>
    );
  }
}
