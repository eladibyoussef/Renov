import { Box, Container } from '@mui/material';
import HorizontalNonLinearStepper from '../components/Stepper/HorizontalNonLinearStepper'

function ApplyPage() {
  

    return (
      <div className='py-8 px-4'>
        <Container fixed>
            <Box className="bg-white" >
            <HorizontalNonLinearStepper />
            </Box> 
        </Container>
        
        </div>
    );
}

export default ApplyPage;
