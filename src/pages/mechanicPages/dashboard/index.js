import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Row, Col, Tabs, Table } from "antd";
import { connect } from "react-redux";
import { getMechanicService } from "../../../services/mechanic";
import { ChartistGraphComponent } from "../../../components/GobalComponents/ChartistGraph";
import { MoreInfoCard } from "../../../components/GobalComponents/MoreInfoCard";
import data from "./data.json";

const { TabPane } = Tabs;
@connect(({ user }) => ({ user }))
class DashboardMechanic extends React.Component {
  state = {
    ordersGraph: data.ordersGraph,
    amountGraph: data.amountGraph,
    lastClients: data.lastClients,
    company: {},
    workshop: {}
  };

  componentDidMount() {
    getMechanicService().then(response => {
      this.setState({
        company: response.company,
        workshop: response.workshop
      });
    });
  }

  render() {
    const {
      company,
      workshop,
      ordersGraph,
      amountGraph,
      lastClients
    } = this.state;
    const { user } = this.props;
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
      <Authorize roles={["MECHANIC"]} redirect to="/404">
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
                          <h2 style={{ color: "red" }}>
                            Bienvenido {user.name}
                          </h2>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row gutter={20}>
                    <Col md={12} xs={24}>
                      <MoreInfoCard
                        title="Información de mi empresa"
                        moreData={{
                          logo: company.logo,
                          name: company.business_name,
                          more: `NIT:${company.nit}`
                        }}
                        modalData={company}
                        type={1}
                      />
                    </Col>
                    <Col md={12} xs={24}>
                      <MoreInfoCard
                        title="Información de mi taller"
                        moreData={{
                          logo: workshop.logo,
                          name: workshop.name,
                          more: `Dirección:${workshop.address}`
                        }}
                        modalData={workshop}
                        type={2}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={18} xs={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Grafica Taller" key="1">
                    <ChartistGraphComponent
                      title="Total de citas cumplidas en la ultima semana en general"
                      data={ordersGraph}
                    />
                  </TabPane>
                  <TabPane tab="Grafica Personal" key="2">
                    <ChartistGraphComponent
                      title="Grafica de mis citas"
                      data={amountGraph}
                    />
                  </TabPane>
                </Tabs>
              </Col>
              <Col md={6} xs={24}>
                <div className="font-size-16 text-black mb-3">
                  <h3 style={{ color: "red" }}>Mis Ultimos Clientes</h3>
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

export default DashboardMechanic;
