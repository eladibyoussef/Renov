import React, { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoPersonnelles from '../multi-Form/InfoPersonnelles';
import InfoProfessionnelles from '../multi-Form/InfoProfessionnelles';
import FinishedPage from '../multi-Form/FinishedPage'; 
import Popper from '@mui/material/Popper';
import { CgDanger } from "react-icons/cg";
import { Transition } from 'react-transition-group';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import InformationReview from './infoReview';
import { useAppDispatch } from '@/store/hooks';
import { ProfessionalRequest } from '@/features/professional/professionalSlice';


const steps = ['Personal Info', 'Professional Info', 'Finished'];

export default function HorizontalNonLinearStepper() {
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState([false, false, false]);
  const dispatch = useAppDispatch()
  const [personalInfo, setPersonalInfo] = useState({
    username: '',
    CIN: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    license: '',
    servicesProvided: '',
    certificates: '',
    companyname: '',
    anthropometricCertificate: '',
 
  });


  useEffect(() => {
    console.log('Personal Info changed:', personalInfo);
    const requiredPersonalFields = ['username', 'cin', 'email',  'phoneNumber', 'address'];
     const  isStepValid = requiredPersonalFields.every(field => !!personalInfo[field]);
      if (isStepValid){
        setAnchorEl(null)
      }
  }, [personalInfo]);

  useEffect(() => {
    console.log('Professional Info changed:', professionalInfo);
    const requiredProfessionalFields = ['license', 'servicesProvided', 'certificates', 'companyname'];
      const isStepValid = requiredProfessionalFields.every(field => !!professionalInfo[field]);
      if (isStepValid){
        setAnchorEl(null)
      }
  }, [professionalInfo]);

  const handleNext = (e) => {
    let isStepValid = false;

    if (activeStep === 0) {
      const requiredPersonalFields = ['username', 'CIN', 'email',  'phoneNumber', 'address'];
      isStepValid = requiredPersonalFields.every(field => !!personalInfo[field]);
    } else if (activeStep === 1) {
      const requiredProfessionalFields = ['license', 'servicesProvided', 'certificates', 'companyname'];
      isStepValid = requiredProfessionalFields.every(field => !!professionalInfo[field]);
    }

    if (isStepValid) {
      const newCompleted = [...completed];
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
     if(activeStep === 1 ){
      setOpenModal(true)
     }
      
    } else {
      handleClick(e)
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
    console.log(personalInfo);
    
  };

  const handleProfessionalInfoChange = (field, value) => {
    setProfessionalInfo({ ...professionalInfo, [field]: value });
    console.log(professionalInfo);

  };
  const onSub = async () => {
    if (activeStep === 2) {
      const combinedForm = { ...personalInfo, ...professionalInfo };
      console.log('The full form is', combinedForm);
      const response = await dispatch(ProfessionalRequest(combinedForm)).unwrap()
      console.log('server res',response);
      return response
      
    }
  }
  

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
            <>
            <Button onClick={handleNext}>
              {completed[activeStep] ? 'Next' : 'Complete Step'}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}         placement='top-end'
>           
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' , display:'flex' , justifyContent:'center' , alignItems:'center' , gap:0.5}}>
        <CgDanger className=' text-red-800 ' />
   Please fill out all required fields.        </Box>
      </Popper>
            </>
            
          )}
        </Box>
      </div>
      <InformationReview handleBack={handleBack} onSub={onSub} openModal={openModal} setOpenModal={setOpenModal} professionalInfo={professionalInfo} personalInfo={personalInfo} />
    </Box>
  );
}
