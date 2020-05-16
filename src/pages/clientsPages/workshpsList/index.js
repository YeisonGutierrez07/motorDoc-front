import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Row, Col, Input, Spin } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllWorkshopService } from "../../../services/workshops";
import DetailWorkshop from "./detailWorkshop";
import { setWorkshops } from "../../../redux/appointment";

const { Search } = Input;

export class componentName extends Component {
  state = {
    workshops: [],
    loading: true
  };

  componentDidMount() {
    this.getAll("");
  }

  getAll = search => {
    
    this.setState({loading: true});
    getAllWorkshopService(search).then(response => {
      this.setState({
        workshops: response,
        loading: false
      });
      const { setWorkshops: setWorkshop } = this.props;
      setWorkshop(response);
    });
  };

  render() {
    const { workshops, loading } = this.state;
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
      <Authorize roles={["CLIENT"]} redirect to="/404">
        <Helmet title="Talleres" />
        <div className="card">
          <div className="card-body">
            <Row>
              <Col>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="utils__title" align="center">
                          <h2 style={{ color: "red" }}><b>Listado de talleres</b></h2>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <b>Buscar por nombre: </b>
                        <Search
                          placeholder="Buscar..."
                          onSearch={value => this.getAll(value)}
                          enterButton
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="utils__titleDescription" align="center">
                    En esta sección vas a encontrar el listado de los talleres que prestan su servicio mediante nuestra plataforma
                  </div>
                  <br />
                  <div className="card-body">
                    {loadingData()}
                    {
                      workshops.length > 0 || loading ?
                        <Row gutter={20}>
                          {Object.keys(workshops).map(c => (
                            <Col md={12} xs={24}>
                              <DetailWorkshop info={workshops[c]} history={history} />
                              <br />
                            </Col>
                          ))}
                        </Row> : <div align="center" className="utils__titleDescription"><h3>Upps No se encontro ningun taller</h3></div>
                    }
                  </div>
                  <br />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Authorize>
    );
  }
}

const mapStateToProps = data => ({ workshops: data.workshops });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setWorkshops }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(componentName);
