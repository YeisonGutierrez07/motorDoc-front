import React, { Fragment } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Collapse, Button, Avatar } from 'antd';
import moment from 'moment';
import './style.css';
import { setMechanicSelected, setDateHourAppointment } from '../../../../redux/appointment';
import { truncateAppointments } from '../../../../common';


const { Panel } = Collapse;

export const SecondContent = ({ next }) => {

  let index = 0;
  const dispatch = useDispatch();
  const { 
    dateAppointment, 
    routineSelected,
    mechanics
  } = useSelector(
    state => ({
      routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
      mechanics: state.appointment.mechanics,
    }),
    shallowEqual
  );
  if(routineSelected[0].estimatedTime <= 0){
    return(
      <Fragment>
        No hay citas disponibles
      </Fragment>
    )
  }
  if(mechanics.length <= 0){
    return(
      <Fragment>
        No hay mecánicos disponibles 
      </Fragment>
    )
  }
  const appointments = truncateAppointments(dateAppointment, routineSelected[0].estimatedTime).map(p => (
    {
      id: p.index,
      day: p.day,
      appointment: p.dayandhours.map(x => (
        x.hour.map(h => {
            const hours = {
              index,
              mechanic: mechanics,
              hour: h
            }
            index += 1;
            return hours;
          }
        ))
      )
    }
  ));

  const callback = (key) => {
    console.log(key);
  }

  const selectAppointment = data => {
    const dateHourAppointment = moment(`${data.day} ${data.hour}`).format('L HH:mm:ss');
    next();
    dispatch(setMechanicSelected(data.mechanic.key));
    dispatch(setDateHourAppointment(dateHourAppointment));
  }
  return (
    <Fragment>
      <Collapse onChange={callback} style={{ margin: 20 }} defaultActiveKey={['0']}>
        {appointments.map(item => (
          <Panel header={item.day} key={item.id}>
            <Collapse>
              {item.appointment.map(data => (
                data.map(x => (
                  <Panel header={x.hour} key={x.index}>
                    {x.mechanic.map(mechanic => panel({ day: item.day, hour: x.hour, mechanic }, selectAppointment))}
                  </Panel>
                ))
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </Fragment>
  );
};

const panel = (data, selectAppointment) => (
  <Fragment>
    {`${data.mechanic.value}`}&nbsp;<Avatar size='small' src={data.mechanic.pic} shape='circle' />&nbsp;
    <Button type='primary' onClick={() => selectAppointment(data)}>Seleccionar</Button>
  </Fragment>
);
export default SecondContent;


