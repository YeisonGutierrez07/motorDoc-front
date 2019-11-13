import React, { Component } from "react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Row, Col } from "antd";
import { getAllWorkshopService } from "../../../services/workshops";
import DetailWorkshop from "./detailWorkshop";

export default class misWorkShops extends Component {
  state = {
    workshops: []
  };

  componentDidMount() {
    this.getAll("");
  }

  getAll = search => {
    getAllWorkshopService(search).then(response => {
      this.setState({
        workshops: response
      });
    });
  };

  render() {
    const { workshops } = this.state;
    const { history } = this.props;

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
                        <div className="utils__title">
                          <h4 style={{ color: "red" }}>
                            Listado de mis Talleres
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {Object.keys(workshops).map(c => (
                      <div key={c}>
                        <br />
                        <DetailWorkshop info={workshops[c]} history={history} />
                      </div>
                    ))}
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
