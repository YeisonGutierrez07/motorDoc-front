import React, { Fragment, useState, useEffect } from "react";
import { Select, DatePicker, Row, Col, notification, Spin } from "antd";
import moment from "moment";
import "./style.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { GetRoutineByWorkShop } from "../../../../services/routines";
import { getTreatingMechanic } from "../../../../services/mechanic";
import { GetAllVehicles } from "../../../../services/vehicles";
import {
  setWorkshopSelected, setRoutines, setVehicles,
  setVehicleSelected, setSelectedRoutine,
  setDateAppointment, setMechanicSelected,
  setMechanics
} from "../../../../redux/appointment";

const { Option } = Select;

export const FirstContent = () => {
  const dispatch = useDispatch();
  const {
    idWorkshop,
    vehicles,
    routines,
    vehicleSelected,
    workshopSelected,
    routineSelected,
    dateAppointment,
    mechanics,
    mechanicSelected
  } = useSelector(
    state => ({
      idWorkshop: parseInt(state.router.location.pathname.split("/")[3], 10),
      vehicles: state.appointment.vehicles,
      routines: state.appointment.routines,
      mechanics: state.appointment.mechanics,
      vehicleSelected: state.appointment.vehicleSelected,
      workshopSelected: state.appointment.workshopSelected,
      routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
      mechanicSelected: state.appointment.mechanicSelected,
    }),
    shallowEqual
  );
  // console.log(useSelector(x =>x));

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const vehiclesData = await GetAllVehicles();
    if (vehiclesData != null) {
      dispatch(setVehicles(vehiclesData));
    }
    else {
      notification.error({
        message: "Error",
        description: "Error al consultar los vehículos"
      });
    }
    setLoading(false);
  };

  const getDataRoutine = async idreferencebrand => {
    setLoading(true);
    const routineData = await GetRoutineByWorkShop(workshopSelected, idreferencebrand);
    if (routineData !== null && routineData.length > 0) {
      dispatch(setRoutines(routineData));
    }
    else {
      dispatch(setRoutines([]));
    }
    dispatch(setSelectedRoutine([]));
    setLoading(false);
  }

  const getDataMechanic = async (idworkshop, idVehicle) => {
    setLoading(true);
    const mechanicData = await getTreatingMechanic(idworkshop, idVehicle);
    if (mechanicData != null && mechanicData.length > 0) {
      dispatch(setMechanics(mechanicData));
    } else {
      dispatch(setMechanics([]));
    }
    dispatch(setMechanicSelected(undefined));
    setLoading(false);
  }
  const setWorkshopId = () => {
    dispatch(setWorkshopSelected(idWorkshop));
  };

  const setSelectVehicle = id => {
    dispatch(setVehicleSelected(id));
    const idreferencebrand = id.split('-')[1];
    const idVehicle = id.split('-')[0];
    getDataRoutine(idreferencebrand);
    getDataMechanic(idWorkshop, idVehicle);
  }

  const setSelectRoutine = id => {
    dispatch(setSelectedRoutine(id));
  }

  const setSelectedMechanic = id => {
    dispatch(setMechanicSelected(id));
  }

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
  const onChangeDate = (date, dateString) => {
    dispatch(setDateAppointment(dateString));
  };

  const disabledDate = current =>
    moment().isAfter(current) &&
    moment().format("l") !== moment(current).format("l");

  useEffect(() => {
    getData();
    setWorkshopId();
  }, [idWorkshop]);

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
            value={vehicleSelected}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {vehicles != null
              ? vehicles.map(x => (
                <Option key={x.id} value={`${x.id}-${x.idreferencebrand}`}>
                  {x.placa}
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
            value={routineSelected.length <= 0 ? undefined : routineSelected[0].key}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {routines != null
              ? routines.map(({ key, value }) => (
                <Option key={key} value={key}>
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
            defaultValue={dateAppointment === undefined ? undefined : moment(dateAppointment, 'YYYY-MM-DD')}
          />
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
          <p align="left">Costo aproximado (COP):</p>
        </Col>
        <Col span={10} xs={12}>
          <p align="left">{routineSelected <= 0 ? 'N/A' : routineSelected[0].cost}</p>
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
          <p align="left">Tiempo aproximado (Min):</p>
        </Col>
        <Col span={10} xs={12}>
          <p align="left">{routineSelected <= 0 ? 'N/A' : routineSelected[0].estimatedTime}</p>
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
            onChange={setSelectedMechanic}
            value={mechanicSelected}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {mechanics != null
              ? mechanics.map(({ key, value }) => (
                <Option key={key} value={key}>
                  {value}
                </Option>
              ))
              : null}
          </Select>
        </Col>
        <Col span={4}>&nbsp;</Col>
      </Row>
    </Fragment>
  );
};
export default FirstContent;