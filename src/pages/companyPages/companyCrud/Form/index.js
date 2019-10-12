/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { Form, Row, Col, Button, Popconfirm } from 'antd';
import RegisterUser from 'components/GobalComponents/Forms/registerUser'
import {createWorkShopService} from '../../../../services/companies'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
}

class CardsForm extends React.Component {

  state= {
    image: ""
  }

  handleSubmit = () => {
    const {image} = this.state
    const {form, history} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const dataService = {
          name: values.name,
          last_name: values.lastName,
          address: values.address,
          email: values.email,
          credential: values.credential,
          profile_pic: image,
          mobile_phone: values.mobilePhone, 
        }
        createWorkShopService(dataService)
        .then(() => {
          history.push(`/workshopPages/listMechanics`)
        })
      }
    })
  }
  
  saveImage = base64 => {
    this.setState({
      image: base64
    })
  }
  
  render() {
    const {form} = this.props

    return (
      <Authorize roles={['COMPANY']} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-body">
                    <RegisterUser title="Información del taller" formItemLayout={formItemLayout} form={form} saveImage={this.saveImage} />
                  </div>
                </div>
              </Col>
            </Row>
            <div align="center">
              <Popconfirm
                title="¿Esta seguro de agregar el taller a su empresa?"
                onConfirm={() => this.handleSubmit()}
                okText="Si"
                cancelText="No"
              >
                <Button type="primary">
                  Agregar taller
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default Form.create()(CardsForm)
