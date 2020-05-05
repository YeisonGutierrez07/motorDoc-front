import React, { Fragment, useState, useEffect, useRef } from "react";
import { Select, DatePicker, Row, Col, notification, Spin } from "antd";
import moment from "moment";
import "./style.css";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { GetRoutineByWorkShop } from "../../../../services/routines";
import { GetAllVehicles } from "../../../../services/vehicles";
import { 
  setWorkshopSelected, setRoutines, setVehicles, 
  setVehicleSelected, setSelectedRoutine,
  setDateAppointment
} from "../../../../redux/appointment";

const { Option } = Select;

export const FirstContent = props => {
  const dispatch = useDispatch();
  const {
    idWorkshop,
    vehicles,
    routines,
    vehicleSelected,
    workshopSelected,
    routineSelected,
    dateAppointment
  } = useSelector(
    state => ({
      idWorkshop: parseInt(state.router.location.pathname.split("/")[3], 10),
      vehicles: state.appointment.vehicles,
      routines: state.appointment.routines,
      vehicleSelected: state.appointment.vehicleSelected,
      workshopSelected: state.appointment.workshopSelected,
      routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
    }),
    shallowEqual
  );
  // console.log(useSelector(x =>x));
  const [selectMechanic, setSelectMechanic] = useState(undefined);
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
    if (routineData != null) {
      dispatch(setRoutines(routineData));
    }
    else {
      notification.error({
        message: "Error",
        description: "Error al consultar las rutinas"
      });
    }
    setLoading(false);
  }

  const setWorkshopId = () => {
    dispatch(setWorkshopSelected(idWorkshop));
  };

  const setSelectVehicle = id => {
    dispatch(setVehicleSelected(id));
    getDataRoutine(id.split('-')[1]);
    validatedButton();
  }

  const setSelectRoutine = id => {
    dispatch(setSelectedRoutine(id));
    validatedButton();
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

  const clearState = () => {
    dispatch(setDateAppointment(undefined));
    dispatch(setRoutines([]));
    dispatch(setVehicleSelected(undefined));
    dispatch(setSelectedRoutine(undefined));
    validatedButton();
  }
  const onChangeDate = (date, dateString) => {
    dispatch(setDateAppointment(dateString));
    console.log(dateAppointment, dateString);
    validatedButton(true, dateString);
  };
  const validatedButton = (isDate = false, dateString) => {
    if(
      vehicleSelected !== undefined &&
      workshopSelected !== undefined &&
      routineSelected !== undefined 
    ){
      if(!isDate){
        if(dateAppointment === undefined || dateAppointment === ""){
          props.disabledButton(true);
          return ;
        }
      }else if(dateString === ""){
        props.disabledButton(true);
        return;
      }
      props.disabledButton(false);
    }else{
      props.disabledButton(true);
    }
  }

  const disabledDate = current =>
    moment().isAfter(current) &&
    moment().format("l") !== moment(current).format("l");

  const prevWorshopRef = useRef();

  useEffect(() => {
    getData();
    setWorkshopId();
    prevWorshopRef.current = idWorkshop;
    if(prevWorshopRef.current !== idWorkshop){
      clearState();
    }
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
            value={routineSelected}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {routines != null
              ? routines.map(({ key, value }) => (
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