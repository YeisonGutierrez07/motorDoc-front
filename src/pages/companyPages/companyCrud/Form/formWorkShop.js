import React, { Component } from "react";
import { Input, Form, Upload, Icon } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;
const FormItem = Form.Item;

export class FormWorkShop extends Component {
  render() {
    const { formItemLayout, form, saveImageWorkshop } = this.props;

    const props = {
      onChange(e) {
        const file = e.fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            saveImageWorkshop(reader.result);
          }
        };
      }
    };

    return (
      <div className="row" align="center">
        <div className="col-lg-2" />
        <div className="col-lg-8">
          <div className="utils__title">
            <h4 style={{ color: "red" }}>Información del taller</h4>
          </div>
          <div className="utils__titleDescription">
            Ingrese la siguiente infomación
          </div>
          <br />
          <FormItem {...formItemLayout} label="Nombre: ">
            {form.getFieldDecorator("nameWorkshop", {
              rules: [
                {
                  required: true,
                  message: "¡Por favor ingrese el nombre del taller!"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Descripción: ">
            {form.getFieldDecorator("description", {
              rules: [
                {
                  required: true,
                  message:
                    "¡Por favor ingrese una breve descripción del taller!"
                }
              ]
            })(<TextArea rows={4} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Dirrecion del taller: ">
            {form.getFieldDecorator("addressWorkshop", {
              rules: [
                {
                  required: true,
                  message: "¡Por favor ingrese la dirección del taller!"
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Logo: ">
            {form.getFieldDecorator("logo", {
              rules: [
                {
                  required: true,
                  message: "¡Por favor ingrese el logo de la empresa!"
                }
              ]
            })(
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Haga clic o arrastre el archivo a esta área para cargar
                </p>
                <p className="ant-upload-hint">Agregar logo de la compañia</p>
              </Dragger>
            )}
          </FormItem>
        </div>
        <div className="col-lg-2" />
      </div>
    );
  }
}

export default FormWorkShop;
