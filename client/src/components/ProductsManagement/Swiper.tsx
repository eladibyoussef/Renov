import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export default function Swiper({photos}) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = photos.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };
  
    return (
     <Carousel    plugins={[
      Autoplay({
        delay: 5000,
      }),
    ]}>
        <CarouselContent>
          {photos.map((photo: string | undefined) =>    <CarouselItem ><img src={photo} alt={`${photo}`} style={{height:255, width:255}} /></CarouselItem>
)}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />

     </Carousel>
    );
}
