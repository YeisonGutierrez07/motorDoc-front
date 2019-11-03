import React, { Component } from "react";
import { Input, Form, Upload, Icon, InputNumber, Row, Col } from "antd";

const { Dragger } = Upload;
const FormItem = Form.Item;

export class RegisterUser extends Component {
  render() {
    const { formItemLayout, form, saveImage, title } = this.props;
    const props = {
      onChange(e) {
        const file = e.fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            saveImage(reader.result);
          }
        };
      }
    };

    return (
      <div className="row" align="center">
        <div className="col-lg-1" />
        <div className="col-lg-10">
          <div className="utils__title">
            <h4 style={{ color: "red" }}>{title}</h4>
          </div>
          <div className="utils__titleDescription">
            Ingrese la siguiente infomación
          </div>
          <br />
          <Row gutter={20}>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Nombre: ">
                {form.getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "¡Por favor ingrese el nombre!" }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Apellido: ">
                {form.getFieldDecorator("lastName", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese el apellido!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Email: ">
                {form.getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "¡Por favor ingrese el correo!" }
                  ]
                })(<Input type="email" />)}
              </FormItem>
            </Col>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Dirección: ">
                {form.getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese la dirección!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Celular: ">
                {form.getFieldDecorator("mobile_phone", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese el Celular!"
                    }
                  ]
                })(<InputNumber min={1} style={{ width: "100%" }} />)}
              </FormItem>
            </Col>
            <Col md={12} xs={24}>
              <FormItem {...formItemLayout} label="Cedula: ">
                {form.getFieldDecorator("credential", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese el documento de identidad!"
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col md={24} xs={24}>
              <FormItem {...formItemLayout} label="Foto de perfil: ">
                {form.getFieldDecorator("profilePic", {
                  rules: [
                    {
                      required: true,
                      message: "¡Por favor ingrese la foto de perfil!"
                    }
                  ]
                })(
                  <Dragger {...props} accept>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      Haga clic o arrastre el archivo a esta área para cargar
                    </p>
                    <p className="ant-upload-hint">Agregar la foto de perfil</p>
                  </Dragger>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
        <div className="col-lg-1" />
      </div>
    );
  }
}

export default RegisterUser;
