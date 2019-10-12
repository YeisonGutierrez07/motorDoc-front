import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { Row, Col, Select, Spin, Alert  } from 'antd';
import { connect } from 'react-redux'
import {GetMyCompany, getMisWorkShopService} from '../../../services/companies'
import {ChartistGraphComponent} from '../../../components/GobalComponents/ChartistGraph'
import data from './data.json'

const {Option} = Select
@connect(({ user }) => ({ user }))
class DashboardMechanic extends React.Component {

  state = {
    ordersGraph: data.ordersGraph,
    company: {},
    listWorkShop:[]
  }

  componentDidMount() {
    GetMyCompany()
    .then(response => {
      this.setState({
        company: response
      })
    })
    this.getAllWorShop()
  }

  getAllWorShop = () => {
    getMisWorkShopService()
    .then(listWorkShop => {
      this.setState({
        listWorkShop
      })
    })
  }

  render() {
    const {company, ordersGraph, listWorkShop} = this.state
    
    return (
      <Authorize roles={['COMPANY']} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="utils__title">
                          <h2 style={{color:'red'}}><b>Empresa:</b> {company.business_name}</h2>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={8} xs={24}>
                <Spin spinning={false}>
                  <Alert
                    message="450"
                    description="Total de citas agendadas par todos sus talleres"
                    type="info"
                  />
                </Spin>
              </Col>
              <Col md={8} xs={24}>
                <Spin spinning={false}>
                  <Alert
                    message="432"
                    description="Citas cumplidas por sus taller"
                    type="success"
                  />
                </Spin>
              </Col>
              <Col md={8} xs={24}>
                <Spin spinning={false}>
                  <Alert
                    message="18"
                    description="Citas canceladas"
                    type="error"
                  />
                </Spin>
              </Col>
            </Row>
            <br />
            <div align="right">
              <b>Seleccione un taller: </b>
              <Select
                style={{ width: 200 }}
                placeholder="Seleccione el taller"
                optionFilterProp="children"
              >
                {Object.keys(listWorkShop).map(c => (
                  <Option key={c} value={listWorkShop[c].id}>{listWorkShop[c].name}</Option> 
                ))}
              </Select>
            </div>
            <ChartistGraphComponent title="Total de citas cumplidas en la ultima semana en general" data={ordersGraph} />
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardMechanic

