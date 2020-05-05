import React from "react";
import { Row, Col } from "antd";

export const CardView = props => {
  const { title, body } = props;
  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col>
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="utils__title">
                      <h4 style={{ color: "red" }}>{title}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">{body}</div>
              <br />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardView;
