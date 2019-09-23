import React, { Component } from 'react';
import {  Input, Form, Upload, Icon} from 'antd';

const { Dragger } = Upload;
const FormItem = Form.Item;

export class FormCompany extends Component {
  render() {
    const {formItemLayout, form, saveImageCompany} = this.props

    const props = {
      onChange(e) {
        const file = e.fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            saveImageCompany(reader.result)
          }
        };
      },
    };
    
    return (
      <div className="row" align="center"> 
        <div className="col-lg-2" />
        <div className="col-lg-8">
          <div className="utils__title">
            <h4 style={{color:'red'}}>Información de la empresa</h4>
          </div>
          <div className="utils__titleDescription">Ingrese la siguiente infomación</div>
          <br />
          <FormItem {...formItemLayout} label="Razón Social: ">
            {form.getFieldDecorator('business_name', {
              rules: [{ required: true, message: '¡Por favor ingrese la razón Social de la empresa!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Nit: ">
            {form.getFieldDecorator('nit', {
              rules: [{ required: true, message: '¡Por favor ingrese el NIT de la empresa!' }],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Logo: ">
            {form.getFieldDecorator('logo', {
              rules: [{ required: true, message: '¡Por favor ingrese el logo de la empresa!' }],
            })(
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para cargar</p>
                <p className="ant-upload-hint">
                  Agregar logo de la compañia
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

export default FormCompany;
