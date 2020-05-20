import React, { Fragment } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Collapse, Button } from 'antd';
import moment from 'moment';
import './style.css';
import { setMechanicSelected, setDateHourAppointment } from '../../../../redux/appointment';
import { truncateAppointments } from '../../../../common';


const { Panel } = Collapse;

export const SecondContent = ({ next }) => {

  let index = 0;
  const dispatch = useDispatch();
  const { dateAppointment } = useSelector(
    state => ({
      // routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
    }),
    shallowEqual
  );
  const appointments = truncateAppointments(dateAppointment, 70).map(p => (
    {
      id: p.index,
      day: p.day,
      appointment: p.dayandhours.map(x => (
        x.hour.map(h => {
            const hours = {
              index,
              mechanic: [{
                id: 1,
                name: 'Jorge',
                last_name: 'Canchon'
              }],
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
    dispatch(setMechanicSelected(data.mechanic.id));
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
    {`${data.mechanic.name} ${data.mechanic.last_name}`} <Button type='primary' onClick={() => selectAppointment(data)}>Seleccionar</Button>
  </Fragment>
);
export default SecondContent;