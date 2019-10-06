import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { Row, Col, Tabs, Table } from 'antd';
import { connect } from 'react-redux'
import {GetMyCompany} from '../../../services/companies'
import {ChartistGraphComponent} from '../../../components/GobalComponents/ChartistGraph'
import data from './data.json'


const {TabPane} = Tabs
@connect(({ user }) => ({ user }))
class DashboardMechanic extends React.Component {

  state = {
    ordersGraph: data.ordersGraph,
    amountGraph: data.amountGraph,
    lastClients: data.lastClients,
    company: {},
  }

  componentDidMount() {
    GetMyCompany()
    .then(response => {
      this.setState({
        company: response
      })
    })
  }

  render() {
    const {company, ordersGraph, amountGraph, lastClients} = this.state
    console.log(company);
    
    const {user} = this.props
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: text => `$${  text}`,
      },
    ]

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
                          <h2 style={{color:'red'}}>Bienvenido {user.name}</h2>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={18} xs={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Grafica Taller" key="1">
                    <ChartistGraphComponent title="Total de citas cumplidas en la ultima semana en general" data={ordersGraph} />
                  </TabPane>
                  <TabPane tab="Grafica Personal" key="2">
                    <ChartistGraphComponent title="Grafica de mis citas" data={amountGraph} />
                  </TabPane>
                </Tabs>
              </Col>
              <Col md={6} xs={24}>
                <div className="font-size-16 text-black mb-3">
                  <h3 style={{color: 'red'}}>Listado de cliente VIP</h3>
                </div>
                <Table columns={columns} dataSource={lastClients} pagination={false} />
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardMechanic

