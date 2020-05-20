import React, { Fragment, useState } from 'react';
import { Steps, Button, message, notification } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import Authorize from 'components/LayoutComponents/Authorize';
import { FirstContent } from './components/FirstContent';
import { SecondContent } from './components/SecondContent';
import { ThirdContent } from './components/ThirdContent';
import { CardView } from './components/cardview';
import { addAppointment } from '../../../services/appointment';

const { Step } = Steps;

export const Appointment = () => {
  
  const [step, setStep] = useState(0);
  const history = useHistory();

  const next = () => {
    if(step === 0 ){
      if(!validatedButton()){
        notification.error({
          message: 'Error',
          description: 'Debe seleccionar un vehículo, rutina y fecha'
        });
        return;
      }
    }
      setStep(step + 1);
  };
  const {
    vehicleSelected,
    workshopSelected,
    routineSelected,
    dateAppointment,
    dateHourAppointment
  } = useSelector(
    state => ({
      vehicleSelected: state.appointment.vehicleSelected,
      workshopSelected: state.appointment.workshopSelected,
      routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
      dateHourAppointment: state.appointment.dateHourAppointment
    }),
    shallowEqual
  );

  const validatedButton = () => (
    (
      vehicleSelected !== undefined &&
      workshopSelected !== undefined &&
      dateAppointment !== undefined && 
      dateAppointment !== '' &&
      routineSelected !== undefined 
    )
  );

  const prev = () => {
    setStep(step - 1);
  };

  const assignAppointment = async () => {
   
    const idVehicle = vehicleSelected.split('-')[0];
    const appointment = {
      "appointmentdate": dateHourAppointment,
      "workshopsid": workshopSelected,
      "maintenance": {
        "idvehicle": idVehicle,
        "maintenanceroutines":[{
          "costroutine": routineSelected[0].cost,
          "timeroutine": routineSelected[0].estimatedTime,
          "idmechanic": 1,
          "idroutine": routineSelected[0].key
        }]
      }
    }

    const res = await addAppointment(appointment);
    if(res === 200 ){
      message.success('Cita asignada correctamente');
      history.push("/clientsPages/appointmentCalendar");
    }else{
      message.error('Ocurrió un error, por favor intenté de nuevo');
    }

  }

  const steps = [
    {
      title: 'Búsqueda especialidad',
      content: <FirstContent />
    },
    {
      title: 'Disponibilidad',
      content: <SecondContent next={next} />
    },
    {
      title: 'Asignación',
      content: <ThirdContent />
    }
  ];
  return (
    <Authorize roles={['CLIENT']} redirect to='/404'>
      <Helmet title='Citas' />
      <CardView
        title='Asignar Cita'
        body={
          <Fragment>
            <Steps current={step}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className='steps-content'>{steps[step].content}</div>
            <div className='steps-action'>
              {step < steps.length - 2 && (
                <Button
                  type='primary'
                  onClick={() => next()}
                >
                  Siguiente
                </Button>
              )}
              {step === steps.length - 1 && (
                <Button
                  type='primary'
                  onClick={assignAppointment}
                >
                  Asignar cita
                </Button>
              )}
              {step > 0 && (
                <Button style={{ margin: 8 }} onClick={() => prev()}>
                  Anterior
                </Button>
              )}
            </div>
          </Fragment>
        }
      />
    </Authorize>
  );
};
export default Appointment;
