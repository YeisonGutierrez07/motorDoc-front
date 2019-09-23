import React, { Component } from 'react';
import {  Input, Form, Upload, Icon, InputNumber} from 'antd';

const { Dragger } = Upload;
const FormItem = Form.Item;

export class FormUser extends Component {
  render() {
    const {formItemLayout, form, saveImage} = this.props
    const props = {
      onChange(e) {
        const file = e.fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            saveImage(reader.result)
          }
        };
      },
    };
    
    return (
      <div className="row" align="center">
        <div className="col-lg-2" />
        <div className="col-lg-8">
          <div className="utils__title">
            <h4 style={{color:'red'}}>Información del Administrador de la empresa</h4>
          </div>
          <div className="utils__titleDescription">Ingrese la siguiente infomación</div>
          <br />
          <FormItem {...formItemLayout} label="Nombre: ">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '¡Por favor ingrese el nombre del administrador!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Apellido: ">
            {form.getFieldDecorator('lastName', {
              rules: [{ required: true, message: '¡Por favor ingrese el apellido del administrador!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Email: ">
            {form.getFieldDecorator('email', {
              rules: [{ required: true, message: '¡Por favor ingrese el correo del administrador!' }],
            })(<Input type="email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Dirección: ">
            {form.getFieldDecorator('address', {
              rules: [{ required: true, message: '¡Por favor ingrese la dirección del administrador!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Celular: ">
            {form.getFieldDecorator('mobilePhone', {
              rules: [{ required: true, message: '¡Por favor ingrese el Celular del administrador!' }],
            })(<InputNumber min={1} style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Cedula: ">
            {form.getFieldDecorator('credential', {
              rules: [{ required: true, message: '¡Por favor ingrese el documento de identidad del administrador!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Foto de perfil: ">
            {form.getFieldDecorator('profilePic', {
              rules: [{ required: true, message: '¡Por favor ingrese el precio del producto!' }],
            })(
              <Dragger {...props} accept>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                <p className="ant-upload-hint">
                  Agregar la foto de perfil del administrador
                </p>
              </Dragger>
            )}
          </FormItem>
        </div>
        <div className="col-lg-2" />
      </div>
    );
  }
}

export default FormUser;
