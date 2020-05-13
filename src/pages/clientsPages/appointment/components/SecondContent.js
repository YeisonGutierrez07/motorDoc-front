import React, { Fragment } from 'react';
import { Collapse, Button } from 'antd';
import './style.css';

const { Panel } = Collapse;

export const SecondContent = () => {
  const callback = (key) => {
    console.log(key);
  }
  const appointments = [
    {
      id: 0,
      day: '13 Mayo 2020',
      appointment: [{
        id: 0,
        mechanic: [{
          id: 1,
          name: 'Jorge',
          last_name: 'Canchon'
        },
        {
          id: 2,
          name: 'Yeison',
          last_name: 'Gutierrez'
        }],
        hour: '01:00 PM',
      },
      {
        id: 1,
        mechanic: [{
          id: 3,
          name: 'Diego',
          last_name: 'Rios'
        }],
        hour: '01:50 PM'
      }]
    },
    {
      id: 1,
      day: '14 Mayo 2020',
      appointment:[{
        id: 0,
        mechanic: [{
          id: 1,
          name: 'Jorge',
          last_name: 'Canchon'
        }],
        hour: '09:00 AM'
      }]
    }
  ];
  return (
    <Fragment>
      <Collapse onChange={callback} style={{ margin: 20 }} defaultActiveKey={['0']}>
        {appointments.map(item => (
          <Panel header={item.day} key={item.id}>
            <Collapse>
              {item.appointment.map(data => (
                <Panel header={data.hour} key={data.id}>
                  {data.mechanic.map(mechanic => (
                    <p>{`${mechanic.name} ${mechanic.last_name}`} <Button type='link' onClick={(e) => console.log(e)}>Seleccionar</Button></p>
                  ))}
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </Fragment>
  );
};

export default SecondContent;