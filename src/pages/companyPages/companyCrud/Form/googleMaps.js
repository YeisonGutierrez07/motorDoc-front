import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { API_KEY_GOOGLE_MAPS } from "constant/base";

const mapStyles = {
  width: "95%",
  height: "700px"
};

let objeRequest = {
  latitude: 4.595926996587655,
  longitude: -74.11309763789177
};
class MapContainer extends Component {
  onMarkerDragEnd = (t, map, coord) => {
    const { saveltylg } = this.props;
    const { latLng } = coord;

    objeRequest = {
      latitude: latLng.lat(),
      longitude: latLng.lng()
    };
    saveltylg(objeRequest);
  };

  render() {
    const { google } = this.props;
    return (
      <div style={mapStyles}>
        <Map
          google={google}
          zoom={18}
          style={mapStyles}
          initialCenter={{
            lat: objeRequest.latitude,
            lng: objeRequest.longitude
          }}
        >
          <Marker
            position={{ lat: objeRequest.latitude, lng: objeRequest.longitude }}
            draggable
            onDragend={(t, map, coord) => this.onMarkerDragEnd(t, map, coord)}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY_GOOGLE_MAPS
})(MapContainer);
