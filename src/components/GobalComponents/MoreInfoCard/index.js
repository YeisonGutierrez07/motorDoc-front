import React, { Component } from "react";
import { Card, Button, Modal, Row, Col, Collapse, Spin } from "antd";

const { Panel } = Collapse;

export class MoreInfoCard extends Component {
  state = {
    visible: false
  };

  optionModal = status => {
    this.setState({
      visible: status
    });
  };

  getInfoModal = dataShow => {
    if (!dataShow.user) {
      return <Spin size="small" />;
    }
    return (
      <>
        <Col md={6} xs={24}>
          <b>Gerente:</b>
        </Col>
        <Col md={18} xs={24}>
          {`${dataShow.user.name} ${dataShow.user.last_name}`}
        </Col>
        <Col md={6} xs={24}>
          <b>Correo:</b>
        </Col>
        <Col md={18} xs={24}>
          {dataShow.user.email}
        </Col>
        <Col md={6} xs={24}>
          <b>Telefono:</b>
        </Col>
        <Col md={18} xs={24}>
          {dataShow.user.mobilephone}
        </Col>
        <Col md={6} xs={24}>
          <b>Sede principal:</b>
        </Col>
        <Col md={18} xs={24}>
          {dataShow.user.address}
        </Col>
      </>
    );
  };

  additionalInformation = () => {
    const { modalData, type } = this.props;
    if (!modalData.user) {
      return <Spin size="small" />;
    }
    if (type === 1) {
      return (
        <Row gutter={20}>
          {this.getInfoModal(modalData)}
          <Col md={24} xs={24}>
            <br />
            <h4 style={{ color: "red" }}>Todos los talleres:</h4>
            <br />
            <Collapse>
              {modalData.workshops.map(dataWorkshop => (
                <Panel header={dataWorkshop.name} key={dataWorkshop.id}>
                  {this.getInfoModal(dataWorkshop)}
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>
      );
    }
    if (type === 2) {
      return <Row gutter={20}>{this.getInfoModal(modalData)}</Row>;
    }
    return null;
  };

  render() {
    const { moreData, title } = this.props;
    const { visible } = this.state;
    return (
      <>
        <Modal
          title={<h4 style={{ color: "red" }}>Información Adicional</h4>}
          visible={visible}
          onCancel={() => this.optionModal(false)}
          footer={null}
        >
          {this.additionalInformation()}
        </Modal>
        <Card
          size="small"
          title={title}
          extra={
            <Button
              type="link"
              className="gray"
              onClick={() => this.optionModal(true)}
            >
              <u>Saber Mas</u>
            </Button>
          }
          style={{ width: "100%" }}
        >
          <div align="center">
            <img width="500" height="300" src={moreData.logo} alt="Imagen" />
            <h4 style={{ color: "red" }}>{moreData.name}</h4>
            <p>{moreData.more}</p>
          </div>
        </Card>
      </>
    );
  }
}

export default MoreInfoCard;
