import React, { Fragment, useState } from 'react';
import { Steps, Button, message, notification } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import { Helmet } from 'react-helmet';
import Authorize from 'components/LayoutComponents/Authorize';
import { FirstContent } from './components/FirstContent';
import { SecondContent } from './components/SecondContent';
import { ThirdContent } from './components/ThirdContent';
import { CardView } from './components/cardview';

const { Step } = Steps;

export const Appointment = () => {
  const [step, setStep] = useState(0);
  const next = () => {
    if(step === 0 ){
      if(!validatedButton()){
        notification.error({
          message: 'Error',
          description: 'Debe seleccionar un vehículo, rutina y fecha'
        });
        return;
      }
    }else if(step === 1){
      notification.error({
        message: 'Error',
        description: 'Debe seleccionar una cita'
      });
    }
      setStep(step + 1);
  };
  const {
    vehicleSelected,
    workshopSelected,
    routineSelected,
    dateAppointment
  } = useSelector(
    state => ({
      vehicleSelected: state.appointment.vehicleSelected,
      workshopSelected: state.appointment.workshopSelected,
      routineSelected: state.appointment.routineSelected,
      dateAppointment: state.appointment.dateAppointment,
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
    ) === false // quitar
  );

  const prev = () => {
    setStep(step - 1);
  };
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
                  onClick={() => message.success('Processing complete!')}
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
