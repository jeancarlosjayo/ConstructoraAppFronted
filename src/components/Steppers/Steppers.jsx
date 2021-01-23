import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useStylesSteppers } from './Steppers.css';
import SteepOne from '../SteepOne/SteepOne';
import SteepTwo from '../SteepTwo/SteepTwo';
import SteepThree from '../SteepThree/SteepThree';
import SteepComplete from '../SteepComplete/SteepComplete';



const getSteps = () => {
  return ['Registre Obra', 
  'Registre Obreros', 
  'Manejo de información',
    ];
}

const getStepContent = (stepIndex,handleNext,handleBack) => {
  switch (stepIndex) {
    case 0:
      return <SteepOne handleNext={handleNext} handleBack={handleBack}></SteepOne>;
    case 1:
      return <SteepTwo handleNext={handleNext} handleBack={handleBack}></SteepTwo>;
    case 2:
      return <SteepThree handleNext={handleNext} handleBack={handleBack} ></SteepThree>;
    default:
      return 'Unknown stepIndex';
  }
}

const Steppers = () => {
  const classes = useStylesSteppers();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section>
    <div className={classes.root}>
    <div style={{maxWidth:1000,margin:'auto'}}>
      <Stepper activeStep={activeStep} alternativeLabel className={classes.steep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
      <div>
        {activeStep === steps.length ? (
          <SteepComplete handleReset={handleReset}></SteepComplete>
          ) : (
          <div>
            {getStepContent(activeStep,handleNext,handleBack)}
          </div>
        )}
      </div>
    </div>
    </section>
  );
}

export default Steppers