import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { MoreInfoCard } from "components/GobalComponents/MoreInfoCard";

import { Row, Col, Button, Spin } from "antd";
import { getMisWorkShopService } from "../../../services/companies";

export class list extends Component {
  state = {
    listMechanics: [],
    loading: true
  };

  componentDidMount() {
    getMisWorkShopService().then(listMechanics => {
      this.setState({
        listMechanics,
        loading: false
      });
    });
  }

  render() {
    const { history } = this.props;
    const { listMechanics, loading } = this.state;

    const loadingData = () => {
      if (loading) {
        return (
          <div align="center">
            <Spin />
          </div>
        );
      }
      return null;
    };

    return (
      <Authorize roles={["COMPANY"]} redirect to="/404">
        <Helmet title="Principal" />
        <div className="card">
          <div className="card-body">
            <Row gutter={20}>
              <Col xs={24}>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title">
                          <h2 style={{ color: "red" }}><b>Listado de talleres</b></h2>
                        </div>
                        <div className="utils__titleDescription">
                          En esta sección puedes agregar todos los talleres para que los usuarios de motorDOC pueda agendar sus citas 
                        </div>
                      </div>
                      <div className="col-lg-6" align="right">
                        <Button
                          type="primary"
                          onClick={() => history.push("/company/form/0")}
                          icon="plus"
                          size="large"
                        >
                          Agregar taller
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      {loadingData()}
                      <div className="row">
                        {Object.keys(listMechanics).map(c => (
                          <div key={c} className="col-md-6">
                            <MoreInfoCard
                              title="Información del taller"
                              moreData={{
                                logo: listMechanics[c].logo,
                                name: listMechanics[c].name,
                                more: `Dirección:${listMechanics[c].address}`
                              }}
                              modalData={listMechanics[c]}
                              type={2}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

export default list;
