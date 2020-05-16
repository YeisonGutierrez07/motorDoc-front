/* eslint-disable import/no-named-as-default */
import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Row, Col, Input, Form, Button, Spin } from "antd";
import { getAllCompanies } from "../../../../services/companies";
import CardCompany from "./cardCompany";

const { Search } = Input;
class BrandsDashboard extends Component {
  state = {
    listCompanies: [],
    loading: true
  };

  componentDidMount() {
    this.getCompanies("");
  }

  getCompanies = value => {
    getAllCompanies(value).then(response => {
      this.setState({
        listCompanies: response,
        loading: false
      });
    });
  };

  render() {
    const { listCompanies, loading } = this.state;
    const { history } = this.props;

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
      <Authorize roles={["SUPERADMIN"]} redirect to="/404">
        <Helmet title="Empresas" />
        <div className="card">
          <div className="card-body">
            <Row>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title">
                          <h2 style={{ color: "red" }}><b>Listado de empresas</b></h2>
                        </div>
                        <div className="utils__titleDescription">
                          En esta sección puedes ver el listado y agregar empresas que tienen convenio con nosotros
                        </div>
                        <br />
                        <Button
                          shape="round"
                          type="primary"
                          icon="plus"
                          size="large"
                          onClick={() =>
                            history.push(`/superAdmin/formCompanies/0`)
                          }
                        >
                          Agregar Empresa
                        </Button>
                      </div>
                      <div className="col-lg-6" align="center">
                        <b>Buscar por nombre: </b>
                        <Search
                          placeholder="Buscar..."
                          size="large"
                          onSearch={value => this.getCompanies(value)}
                          enterButton
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  {loadingData()}
                  <div className="row">
                    {Object.keys(listCompanies).map(c => (
                      <div key={c} className="col-lg-6 col-md-12">
                        <CardCompany
                          key={c}
                          company={listCompanies[c]}
                          rechargeCompanies={this.getCompanies}
                        />
                      </div>
                    ))}
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
export default Form.create()(BrandsDashboard);
