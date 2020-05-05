import React, { Fragment, useState } from "react";
import { Steps, Button, message } from "antd";
import { Helmet } from "react-helmet";
import Authorize from "components/LayoutComponents/Authorize";
import { FirstContent } from "./components/steps";
import { CardView } from "./components/cardview";
// import { useDispatch, useSelector } from "react-redux";

const { Step } = Steps;

export const Appointment = () => {
  const [step, setStep] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const next = () => {
    setStep(step + 1);
  };

  const disabledButton = bool => {
    setDisabled(bool);
  };

  const prev = () => {
    setStep(step - 1);
  };
  const steps = [
    {
      title: "Paso 1",
      content: <FirstContent disabledButton={disabledButton} />
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
                  disabled={isDisabled}
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
