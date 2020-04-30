import React, { Fragment, useState, useEffect } from "react";
import { Select, DatePicker, Row, Col, notification, Spin } from "antd";
import moment from "moment";
import "./style.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { GetRoutineByWorkShop } from "../../../../services/routines";
import { setWorkshopSelected } from "../../../../redux/appointment";

const { Option } = Select;

export const FirstContent = props => {
  const dispatch = useDispatch();
  const { queryString } = useSelector(
    state => ({
      queryString: state.router.location.pathname
    }),
    shallowEqual
  );

  const [selectRoutine, setSelectRoutine] = useState(undefined);
  const [routine, setRoutine] = useState(undefined);
  const [selectMechanic, setSelectMechanic] = useState(undefined);
  const [selectVehicle, setSelectVehicle] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const GetRoutine = async () => {
    const data = await GetRoutineByWorkShop(1);
    if (data != null) setRoutine(data);
    else {
      notification.error({
        message: "Error",
        description: "Error al consultar las rutinas"
      });
    }
    setLoading(false);
  };

  const setWorkshopId = () => {
    const idWorkshop = parseInt(queryString.split("/")[3], 10);
    dispatch(setWorkshopSelected(idWorkshop));
  };

  const loadingData = () => {
    if (loading) {
      return (
        <Fragment>
          <Spin />
        </Fragment>
      );
    }
    return null;
  };

  useEffect(() => {
    GetRoutine();
    setWorkshopId();
  }, []);

  const onChangeDate = (date, dateString) => {
    props.disabledButton(false);
    console.log(date, dateString);
  };

  const disabledDate = current =>
    moment().isAfter(current) &&
    moment().format("l") !== moment(current).format("l");
  return (
    <Fragment>
      {loadingData()}
      <p align="left" className="text1">
        Búsqueda de cita por especialidad
      </p>
      <Row>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
        <Col span={6} xs={10}>
          <p align="left">Seleccione vehículo:</p>
        </Col>
        <Col span={10} xs={12}>
          <Select
            className="input-routine"
            showSearch
            style={{ width: "100%" }}
            placeholder="Seleccione vehículo"
            optionFilterProp="children"
            onChange={setSelectVehicle}
            value={selectVehicle}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {null}
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
            {routine != null
              ? routine.map(({ key, value }) => (
                  <Option key={key} value={value}>
                    {value}
                  </Option>
                ))
              : null}
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
          <DatePicker
            onChange={onChangeDate}
            className="input-routine"
            disabledDate={disabledDate}
          />
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
          <p align="left">Mecánico tratante</p>
        </Col>
        <Col span={9} align="left">
          <Select
            className="input-routine"
            showSearch
            style={{ width: "100%" }}
            placeholder="Seleccione su mécanico tratante"
            optionFilterProp="children"
            onChange={setSelectMechanic}
            value={selectMechanic}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {null}
          </Select>
        </Col>
        <Col span={4}>&nbsp;</Col>
      </Row>
    </Fragment>
  );
};
export default FirstContent;
