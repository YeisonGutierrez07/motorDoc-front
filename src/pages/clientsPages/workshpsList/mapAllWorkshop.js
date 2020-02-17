import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Authorize from "components/LayoutComponents/Authorize";
import { Helmet } from "react-helmet";
import { Row, Col } from "antd";
import { API_KEY_GOOGLE_MAPS } from "constant/base";
import { getAllWorkshopService } from "../../../services/workshops";

const mapStyles = {
  width: "95%",
  height: "700px"
};

const objeRequest = {
  latitude: 4.595926996587655,
  longitude: -74.11309763789177
};
class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    showDataPopover: { user: {} },
    workshops: []
  };

  componentDidMount() {
    getAllWorkshopService("").then(response => {
      this.setState({
        workshops: response
      });
    });
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      showDataPopover: props.data
    });
  };

  render() {
    const {
      workshops,
      activeMarker,
      showingInfoWindow,
      showDataPopover
    } = this.state;

    const { google } = this.props;
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
                          <h2 style={{ color: "red" }}>
                            <b>Talleres ubicados en el mapa</b>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div style={mapStyles}>
                      <Map
                        google={google}
                        zoom={11}
                        style={mapStyles}
                        initialCenter={{
                          lat: objeRequest.latitude,
                          lng: objeRequest.longitude
                        }}
                      >
                        {Object.keys(workshops).map(c => (
                          <Marker
                            position={{
                              lat: workshops[c].latitude,
                              lng: workshops[c].longitude
                            }}
                            data={workshops[c]}
                            onClick={this.onMarkerClick}
                          />
                        ))}
                        <InfoWindow
                          marker={activeMarker}
                          visible={showingInfoWindow}
                        >
                          <>
                            <h4
                              style={{
                                color: "red",
                                textTransform: "capitalize"
                              }}
                            >
                              <b>{showDataPopover.name}</b>
                            </h4>
                            <p>
                              <b>Dirección:</b> {showDataPopover.address}
                            </p>
                            <p>
                              <b>Telefono:</b>{" "}
                              {showDataPopover.user.mobile_phone}
                            </p>
                            <p>
                              <b>Descripción:</b> {showDataPopover.description}
                            </p>
                          </>
                        </InfoWindow>
                      </Map>
                    </div>
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

export default GoogleApiWrapper({
  apiKey: API_KEY_GOOGLE_MAPS
})(MapContainer);
