import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Row, Col, Tabs, Table, Select, Spin, Alert } from "antd";
import { getWorkshopService } from "../../../services/workshops";
import { ChartistGraphComponent } from "../../../components/GobalComponents/ChartistGraph";
import { getMisMechanicsService } from "../../../services/mechanic";

import data from "./data.json";

const { Option } = Select;
const { TabPane } = Tabs;
class DashboardWorkshp extends React.Component {
  state = {
    ordersGraph: data.ordersGraph,
    amountGraph: data.amountGraph,
    lastClients: data.lastClients,
    workShop: {},
    listMechanics: []
  };

  componentDidMount() {
    getWorkshopService().then(response => {
      this.setState({
        workShop: response
      });
    });
    this.getMechanics();
  }

  getMechanics = () => {
    getMisMechanicsService().then(listMechanics => {
      this.setState({
        listMechanics
      });
    });
  };

  render() {
    const {
      workShop,
      ordersGraph,
      amountGraph,
      lastClients,
      listMechanics
    } = this.state;

    const columns = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Fecha",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: text => `$${text}`
      }
    ];

    return (
      <Authorize roles={["WORKSHOP"]} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-lg-12">
                <div className="utils__title">
                  <h2 style={{ color: "red" }}>
                    <b>Bienvenido a su taller:</b> {workShop.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Row gutter={20}>
              <Row gutter={20}>
                <Col md={8} xs={24}>
                  <Spin spinning={false}>
                    <Alert
                      message="450"
                      description="Total de citas agendadas para su taller"
                      type="info"
                    />
                  </Spin>
                </Col>
                <Col md={8} xs={24}>
                  <Spin spinning={false}>
                    <Alert
                      message="432"
                      description="Citas cumplidas por su taller"
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
              <Col md={18} xs={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Grafica taller" key="1">
                    <ChartistGraphComponent
                      title="Total de citas cumplidas en la ultima semana"
                      data={ordersGraph}
                    />
                  </TabPane>
                  <TabPane tab="Grafica por mecanico" key="2">
                    <div align="right">
                      <b>Seleccione un mecanico: </b>
                      <Select
                        size="small"
                        style={{ width: 200 }}
                        placeholder="Seleccione"
                        optionFilterProp="children"
                      >
                        {Object.keys(listMechanics).map(c => (
                          <Option
                            key={listMechanics[c].id}
                            value={listMechanics[c].id}
                          >
                            {listMechanics[c].user.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <ChartistGraphComponent
                      title="Grafica por mecanico"
                      data={amountGraph}
                    />
                  </TabPane>
                </Tabs>
              </Col>
              <Col md={6} xs={24}>
                <div className="font-size-16 text-black mb-3" align="center">
                  <h3 style={{ color: "red" }}>Listado de cliente VIP</h3>
                </div>
                <Table
                  columns={columns}
                  dataSource={lastClients}
                  pagination={false}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

export default DashboardWorkshp;
