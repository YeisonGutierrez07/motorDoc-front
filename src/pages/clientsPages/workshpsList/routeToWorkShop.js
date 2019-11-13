import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { GoogleApiWrapper } from "google-maps-react";
import { Spin } from "antd";

class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    let lng = 0;
    let lat = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(mostrarUbicacion);
    }

    function mostrarUbicacion(ubicacion) {
      lng = ubicacion.coords.longitude;
      lat = ubicacion.coords.latitude;
      serch();
    }
    const serch = () => {
      const { match, google } = this.props;
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat, lng },
          destination: {
            lat: parseFloat(match.params.latitude),
            lng: parseFloat(match.params.longitude)
          },
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          }
        }
      );
    };
  }

  render() {
    const { directions } = this.state;
    if (!directions) {
      return (
        <div align="center">
          <Spin />
        </div>
      );
    }
    const GoogleMapExample = withGoogleMap(() => (
      <GoogleMap defaultZoom={10}>
        <DirectionsRenderer directions={directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <div className="card-header">
          <div className="row">
            <div className="col-lg-6">
              <div className="utils__title" align="center">
                <h2 style={{ color: "red" }}>
                  <b>¿COMO LLEGAR A EL TALLER?</b>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <GoogleMapExample
          containerElement={<div style={{ height: `700px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCYOTJaYc4EX0C3qkz423L_5rOLUqrfWwc"
})(Map);
