import React, { Fragment, useState } from "react";
import { Steps, Button, message, notification } from "antd";
import { useSelector, shallowEqual } from "react-redux";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { FirstContent } from "./components/steps";
import { CardView } from "./components/cardview";


const { Step } = Steps;

export const Appointment = () => {
  const [step, setStep] = useState(0);
  const next = () => {
    if(step === 0 ){
      if(!validatedButton()){
        notification.error({
          message: "Error",
          description: "Debe seleccionar un vehículo, rutina y fecha"
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
      dateAppointment !== "" &&
      routineSelected !== undefined 
    )
  );

  const prev = () => {
    setStep(step - 1);
  };
  const steps = [
    {
      title: "Paso 1",
      content: <FirstContent next={next} />
    },
    {
      title: "Paso 2",
      content: "Second-content"
    },
    {
      title: "Paso 3",
      content: "Last-content"
    }
  ];
  return (
    <Authorize roles={["CLIENT"]} redirect to="/404">
      <Helmet title="Citas" />
      <CardView
        title="Asignar Cita"
        body={
          <Fragment>
            <Steps current={step}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[step].content}</div>
            <div className="steps-action">
              {step < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => next()}
                  // disabled={isDisabled}
                >
                  Siguiente
                </Button>
              )}
              {step === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  Finalizar
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
