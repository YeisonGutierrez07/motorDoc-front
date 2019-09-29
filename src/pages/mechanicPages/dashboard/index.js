import React from 'react'
import { Helmet } from 'react-helmet'
import ChartistGraph from 'react-chartist'
import Authorize from 'components/LayoutComponents/Authorize'
import { Row, Col, Card, Modal, Button, Collapse, Tabs, Table } from 'antd';
import {getMechanicService} from '../../../services/mechanic'
import data from './data.json'


const {TabPane} = Tabs
const { Panel } = Collapse;

const chartistOptions = {
  fullWidth: true,
  showArea: true,
  chartPadding: {
    right: 30,
    left: 0,
  }
}
class DashboardMechanic extends React.Component {

  state = {
    ordersGraph: data.ordersGraph,
    amountGraph: data.amountGraph,
    lastClients: data.lastClients,
    company: {},
    workshop: {},
    visible: false,
    type:0
  }

  componentDidMount() {
    getMechanicService()
    .then(response => {
      console.log(response);
      this.setState({
        company: response.company,
        workshop: response.workshop,
      })
    })
  }

  showModal = (type) => {
    this.setState({
      visible:true,
      type
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      type: 0
    });
  };

  render() {
    const {company, workshop, visible, type, ordersGraph, amountGraph, lastClients} = this.state

    const additionalInformation = () => {
      const getInfoModal = (dataShow) => {
        return (
          <>
            <Col md={6} xs={24}>
              <b>Gerente:</b>
            </Col>
            <Col md={18} xs={24}>
              {`${dataShow.user.name  } ${ dataShow.user.last_name}`}
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
        )
      }
      if (type === 1) {
        return (
          <Row gutter={20}>
            {getInfoModal(company)}
            <Col md={24} xs={24}>
              <br />
              <h4 style={{color:'red'}}>Todos los talleres:</h4>
              <br />
              <Collapse>
                {company.workshops.map(dataWorkshop => (
                  <Panel header={dataWorkshop.name} key={dataWorkshop.id}>
                    {getInfoModal(dataWorkshop)}
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        )
      } if (type === 2) {
        return (
          <Row gutter={20}>
            {getInfoModal(workshop)}
          </Row>
        )
      }
      return null
    }

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
      <Authorize roles={['MECHANIC']} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-body">
            <Modal
              title={<h4 style={{color:'red'}}>Información Adicional</h4>}
              visible={visible}
              onCancel={this.handleCancel}
              footer={null}
            >
              {additionalInformation()}
            </Modal>
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="utils__title">
                          <h2 style={{color:'red'}}>Pagina principal</h2>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row gutter={20}>
                    <Col md={12} xs={24}>
                      <Card size="small" title="Información de mi empresa" extra={<Button type="link" className="gray" onClick={() => this.showModal(1)}><u>Saber Mas</u></Button>} style={{ width: '100%' }}>
                        <div align="center">
                          <img width='500' height="300" src={company.logo} alt="Imagen de la empresa" />
                          <h4 style={{color:'red'}}>{company.business_name}</h4>
                          <p>NIT: {company.nit}</p>
                        </div>
                      </Card>
                    </Col>
                    <Col md={12} xs={24}>
                      <Card size="small" title="Información de mi taller" extra={<Button type="link" className="gray" onClick={() => this.showModal(2)}><u>Saber Mas</u></Button>} style={{ width: '100%' }}>
                        <div align="center">
                          <img width='500' height="300" src={workshop.logo} alt="Imagen del taller" />
                          <h4 style={{color:'red'}}>{workshop.name}</h4>
                          <p>Dirección: {workshop.address}</p>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={18} xs={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Grafica Taller" key="1">
                    <h3 style={{color: 'red'}}>Total de citas cumplidas en la ultima semana en general</h3>
                    <ChartistGraph
                      data={ordersGraph}
                      options={chartistOptions}
                      className="chart-area height-200 mt-4 chartist"
                      type="Line"
                    />
                    <div className="row">
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Total Citas</div>
                          <div className="font-size-20 text-black">
                            <strong>
                              42
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas cumplidas</div>
                          <div className="font-size-20 text-black">
                            <strong>
                              32
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas por atender</div>
                          <div className="font-size-20 text-black">
                            <strong>
                              7
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas canceladas</div>
                          <div className="font-size-20">
                            <strong>
                              3
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Grafica Personal" key="2">
                    <h3 style={{color: 'red'}}>Grafica de mis citas</h3>
                    <ChartistGraph
                      data={amountGraph}
                      options={chartistOptions}
                      className="chart-area height-200 mt-4 chartist"
                      type="Line"
                    />
                    <div className="row">
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas asignadas</div>
                          <div className="font-size-20 text-black">
                            <strong>
                              24
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas cumplidas</div>
                          <div className="font-size-20 text-black">
                            <strong>
                            15
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas por atender</div>
                          <div className="font-size-20 text-black">
                            <strong>
                            6 
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-6">
                        <div className="mb-3">
                          <div className="font-size-16 mb-2">Citas canceladas</div>
                          <div className="font-size-20">
                            <strong>
                            3
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Col>
              <Col md={6} xs={24}>
                <div className="font-size-16 text-black mb-3">
                  <h3 style={{color: 'red'}}>Mis Ultimos Clientes</h3>
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
