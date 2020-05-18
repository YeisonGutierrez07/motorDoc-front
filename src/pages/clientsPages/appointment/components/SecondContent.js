import React, { Fragment } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Collapse, Button } from 'antd';
import './style.css';
import { setMechanicSelected } from '../../../../redux/appointment';
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

  const selectAppointment = (id) => {
    console.log(id);
    next();
    dispatch(setMechanicSelected(id));
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
                    {x.mechanic.map(mechanic => panel(mechanic, selectAppointment))}
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

const panel = (mechanic, selectAppointment) => (
  <Fragment>
    {`${mechanic.name} ${mechanic.last_name}`} <Button type='primary' onClick={() => selectAppointment(mechanic.id)}>Seleccionar</Button>
  </Fragment>
);
export default SecondContent;