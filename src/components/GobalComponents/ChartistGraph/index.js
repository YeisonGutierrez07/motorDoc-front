import React, { Component } from "react";
import ChartistGraph from "react-chartist";

const chartistOptions = {
  fullWidth: true,
  showArea: true,
  chartPadding: {
    right: 30,
    left: 0
  }
};

export class ChartistGraphComponent extends Component {
  render() {
    const { title, data } = this.props;
    return (
      <>
        <h3 style={{ color: "red" }}>{title}</h3>
        <div className="row" style={{ left: "38px", position: "relative" }}>
          <div
            style={{
              backgroundColor: "#0090F8",
              width: "20px",
              borderRadius: "10px"
            }}
          >
            &nbsp;&nbsp;
          </div>
          Agendadas &nbsp;&nbsp;
          <div
            style={{
              backgroundColor: "#46be8a",
              width: "20px",
              borderRadius: "10px"
            }}
          >
            &nbsp;&nbsp;
          </div>
          Cumplidas
        </div>
        <ChartistGraph
          data={data}
          options={chartistOptions}
          className="chart-area height-200 mt-4 chartist"
          type="Line"
        />
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="mb-3">
              <div className="font-size-16 mb-2">Total Citas</div>
              <div className="font-size-20 text-black">
                <strong>42</strong>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="mb-3">
              <div className="font-size-16 mb-2">Citas cumplidas</div>
              <div className="font-size-20 text-black">
                <strong>32</strong>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="mb-3">
              <div className="font-size-16 mb-2">Citas por atender</div>
              <div className="font-size-20 text-black">
                <strong>7</strong>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="mb-3">
              <div className="font-size-16 mb-2">Citas canceladas</div>
              <div className="font-size-20">
                <strong>3</strong>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChartistGraphComponent;
