import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'antd';

export const ThirdContent = () => {
  const {
    vehicleSelected,
    workshopSelected,
    routineSelected,
    dateAppointment,
    mechanicSelected
  } = useSelector(
    state => ({
      idWorkshop: parseInt(state.router.location.pathname.split('/')[3], 10),
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
  
  return (
    <Fragment>
      <Row>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
        <Col span={6} xs={10}>
          <p align='left'>Vehículo:</p>
        </Col>
        <Col span={10} xs={12}>
          {vehicleSelected} 
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
          <p align='left'>Mecánico:</p>
        </Col>
        <Col span={10} xs={12}>
          {mechanicSelected}
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
          <p align='left'>Fecha y hora cita:</p>
        </Col>
        <Col span={10} xs={12}>
          {dateAppointment}
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
          <p align='left'>Rutina de mantenimiento</p>
        </Col>
        <Col span={10} xs={12}>
          {routineSelected.id}
        </Col>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
      </Row>
      {workshopSelected}
    </Fragment>
  );
}

export default ThirdContent;