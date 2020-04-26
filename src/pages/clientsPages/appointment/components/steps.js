import React, { Fragment, useState } from "react";
import { Select, DatePicker, Row, Col, Checkbox } from "antd";

import "./style.css";

const { Option } = Select;

export const FirstContent = props => {
  const { items } = props;
  const [selectRoutine, setSelectRoutine] = useState(0);
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeCheckbox = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Fragment>
      <p align="left" className="text1">
        Búsqueda de cita por especialidad
      </p>
      <Row>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
        <Col span={6} xs={10} style={{ margin: "left" }}>
          <p align="left">
            Seleccione la especialidad de la cuál requiere la cita:
          </p>
        </Col>
        <Col span={10} xs={12}>
          <Select
            className="input-routine"
            showSearch
            style={{ width: "100%" }}
            placeholder="Seleccione la rutina"
            optionFilterProp="children"
            onChange={setSelectRoutine}
            value={selectRoutine}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {items.map(({ key, value }) => (
              <Option key={key} value={value}>{value}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
      </Row>
      <Row>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
        <Col span={6} xs={10}>
          <p align="left">Seleccione la fecha en la que desea ser atendido:</p>
        </Col>
        <Col span={10} xs={12}>
          <DatePicker onChange={onChangeDate} className="input-routine" />
        </Col>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <hr />
        </Col>
      </Row>
      <p align="left" className="text1">
        Otras opciones de búsqueda
      </p>
      <Row>
        <Col span={1} xs={1}>
          &nbsp;
        </Col>
        <Col span={10}>
          <p align="left">Mecanico tratante</p>
        </Col>
        <Col span={9} align="left">
          <Checkbox onChange={onChangeCheckbox} />
        </Col>
        <Col span={4}>&nbsp;</Col>
      </Row>
      <Row>
        <Col span={1} xs={1}>
          &nbsp;
        </Col>
        <Col span={10}>
          <p align="left">Seleccionar ubicación</p>
        </Col>
        <Col span={9} align="left">
          <Checkbox onChange={onChangeCheckbox} />
        </Col>
        <Col span={4}>&nbsp;</Col>
      </Row>
    </Fragment>
  );
};
export default FirstContent;
