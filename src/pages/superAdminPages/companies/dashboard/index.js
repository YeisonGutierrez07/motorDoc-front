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
                          <h4 style={{ color: "red" }}>Listado de empresas</h4>
                        </div>
                      </div>
                      <div className="col-lg-3" />
                      <div className="col-lg-3">
                        <b>Buscar por nombre: </b>
                        <Search
                          placeholder="Buscar..."
                          size="small"
                          onSearch={value => this.getCompanies(value)}
                          enterButton
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div align="right">
                    <Button
                      shape="round"
                      type="primary"
                      icon="plus"
                      onClick={() =>
                        history.push(`/superAdmin/formCompanies/0`)
                      }
                    >
                      Agregar Empresa
                    </Button>
                  </div>
                  <br />
                  {loadingData()}
                  <div className="row">
                    {Object.keys(listCompanies).map(c => (
                      <div key={c} className="col-lg-6">
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
