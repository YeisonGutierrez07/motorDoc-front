import React from "react";
import "./style.scss";

class VehicleDetail extends React.Component {
  render() {
    const { VehicleData } = this.props;
    return (
      <div className="productCard">
        <div className="productCard__img">
          <a href="javascript: void(0);">
            <img src={VehicleData.image} alt="" />
          </a>
        </div>
        <div className="productCard__title">
          <a href="javascript: void(0);">
            {VehicleData.reference}-{VehicleData.model}
          </a>
        </div>
        <div>
          <a href="javascript: void(0);">{VehicleData.estado}</a>
        </div>
      </div>
    );
  }
}

export default VehicleDetail;
