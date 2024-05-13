import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoPersonnelles from '../multi-Form/InfoPersonnelles';
import InfoProfessionnelles from '../multi-Form/InfoProfessionnelles';
import FinishedPage from '../multi-Form/FinishedPage'; 

const steps = ['Personal Info', 'Professional Info', 'Finished'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState([false, false, false]);
  const [personalInfo, setPersonalInfo] = useState({
    username: '',
    cin: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    license: '',
    servicesProvided: '',
    certificates: '',
    companyname: '',
    profilePicture: '',
    aboutMe: '',
    portfolio: '',
  });

  const handleNext = () => {
    let isStepValid = false;

    if (activeStep === 0) {
      const requiredPersonalFields = ['username', 'cin', 'email', 'password', 'phoneNumber', 'address'];
      isStepValid = requiredPersonalFields.every(field => !!personalInfo[field]);
    } else if (activeStep === 1) {
      const requiredProfessionalFields = ['license', 'servicesProvided', 'certificates', 'companyname', 'profilePicture', 'aboutMe', 'portfolio'];
      isStepValid = requiredProfessionalFields.every(field => !!professionalInfo[field]);
    }

    if (isStepValid) {
      const newCompleted = [...completed];
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);

      if (activeStep === steps.length - 1) {
        console.log('Navigating to Finished Page...');
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handleProfessionalInfoChange = (field, value) => {
    setProfessionalInfo({ ...professionalInfo, [field]: value });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <InfoPersonnelles formData={personalInfo} handleChange={handlePersonalInfoChange} />
        )}
        {activeStep === 1 && (
          <InfoProfessionnelles formData={professionalInfo} handleChange={handleProfessionalInfoChange} />
        )}
        {activeStep === 2 && (
          <FinishedPage />
        )}

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep !== steps.length - 1 && (
            <Button onClick={handleNext}>
              {completed[activeStep] ? 'Next' : 'Complete Step'}
            </Button>
          )}
        </Box>
      </div>
    </Box>
  );
}
