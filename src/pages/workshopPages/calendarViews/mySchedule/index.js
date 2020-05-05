import React from "react";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { Calendar } from "antd";

function onPanelChange(value, mode) {
  console.info(value, mode);
}

const index = ({ match }) => {
  let title = "";

  switch (match.params.type) {
    case "1":
      title = "Mi horario, aca puedes encontrar tu horario disponible";
      break;
    case "2":
      title = "Citas agendadas, aca puedes encontrar tus citas agendadas";

      break;
    case "3":
      title = "Tiempos libres, los tiempos libres de tu taller";
      break;

    default:
      break;
  }

  return (
    <Authorize roles={["WORKSHOP"]} redirect to="/404">
      <Helmet title="Principal" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <h2 style={{ color: "red" }}>{title}</h2>
          </div>
        </div>
        <div className="card-body">
          <Calendar onPanelChange={onPanelChange} />
        </div>
      </div>
    </Authorize>
  );
};

export default index;
