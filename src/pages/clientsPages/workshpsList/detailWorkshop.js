import React, { Component } from "react";
import { Button, Icon } from "antd";

export default class DetailWorkshop extends Component {
  render() {
    const { info, history } = this.props;
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <div className="row">
          <div className="col-3">
            <img width="200" height="120" src={info.logo} alt="User" />
          </div>
          <div className="col-7">
            <h2>
              <p style={{ color: "red" }}>{info.name}</p>
            </h2>
            <p>{info.description}</p>
          </div>
          <div className="col-2" align="center">
            <Button
              type="primary"
              onClick={() => history.push(`/globals/MessagingChat`)}
            >
              <Icon type="wechat" />
              Iniciar Chat
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              onClick={() =>
                history.push(`/clientsPages/appointment/${info.id}`)
              }
            >
              <Icon type="calendar" />
              Agendar cita
            </Button>
            <br />
            <br />
            <Button
              type="primary"
              disabled={info.latitude === 0}
              onClick={() =>
                history.push(
                  `/clientsPages/routeToWorkShop/${info.latitude}/${info.longitude}`
                )
              }
            >
              <Icon type="environment" />
              Como Llegar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
