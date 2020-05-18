import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

export const ThirdContent = () => {
  const {
    idWorkshop,
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
      {mechanicSelected} - {dateAppointment} - {vehicleSelected} - {workshopSelected} - {routineSelected} - {idWorkshop}
    </Fragment>
  );
}

export default ThirdContent;