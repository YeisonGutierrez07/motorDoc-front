import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'antd';

export const ThirdContent = () => {
  const {
    vehicles,
    vehicleSelected,
    routineSelected,
    dateHourAppointment,
    mechanicSelected,
    // mechanics
  } = useSelector(
    state => ({
      vehicles: state.appointment.vehicles,
      routines: state.appointment.routines,
      mechanics: state.appointment.mechanics,
      vehicleSelected: state.appointment.vehicleSelected,
      routineSelected: state.appointment.routineSelected,
      dateHourAppointment: state.appointment.dateHourAppointment,
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
          {vehicles.filter(x => x.id === parseInt(vehicleSelected.split('-')[0], 10))[0].placa}
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
          {dateHourAppointment}
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
          {routineSelected[0].value}
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
          <p align='left'>Costo:</p>
        </Col>
        <Col span={10} xs={12}>
          {routineSelected[0].cost}
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
          <p align='left'>Tiempo estimado</p>
        </Col>
        <Col span={10} xs={12}>
          {routineSelected[0].estimatedTime}
        </Col>
        <Col span={4} xs={1}>
          &nbsp;
        </Col>
      </Row>
    </Fragment>
  );
}

export default ThirdContent;