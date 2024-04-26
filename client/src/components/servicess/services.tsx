import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RH1 from '../../Assets/1.png';
import RH2 from '../../Assets/2.png';
import RH3 from '../../Assets/3.png';
import RH4 from '../../Assets/4.png';

interface Service {
  id: number;
  img: string;
  name: string;
  description: string;
}

const ServicesData: Service[] = [
  {
    id: 1,
    img: RH1,
    name: 'Plomberie',
    description: 'Service de plomberie Lorem ipsum dolor sit amet.',
  },
  {
    id: 2,
    img: RH2,
    name: 'Painting',
    description: 'Service de peinture Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    img: RH3,
    name: 'Electricity',
    description: "Service d'électricité Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    img: RH4,
    name: 'Electricity',
    description: "Service d'électricité Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    img: RH4,
    name: 'Electricity',
    description: "Service d'électricité Lorem ipsum dolor sit amet.",
  },
  {
    id: 6,
    img: RH4,
    name: 'Electricity',
    description: "Service d'électricité Lorem ipsum dolor sit amet.",
  },
];

const Services: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxVisibleCards = 4;
  const endIndex = startIndex + maxVisibleCards;

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const goToPreviousSlide = () => {
    const newStartIndex = startIndex === 0 ? ServicesData.length - maxVisibleCards : startIndex - 1;
    setStartIndex(newStartIndex);
  };

  const goToNextSlide = () => {
    let newStartIndex = startIndex + 1;
    if (newStartIndex + maxVisibleCards > ServicesData.length) {
      newStartIndex = 0;
    }
    setStartIndex(newStartIndex);
  };

  return (
    <div className="bg-white p-6 md:p-12 max-w-screen-lg mx-auto">
      <hr className="border-t-2 border-gray-300 w-1/2 mx-auto md:my-4" />
      <div className="text-center mb-8">
        <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          OUR SERVICES LIST
        </p>
        <h1 className="text-3xl font-bold">Services We Provide</h1>
      </div>

      <div className="relative flex space-x-4 overflow-x-auto md:hidden">
        <motion.div
          key={ServicesData[currentIndex].id}
          className="max-w-[900px] w-full md:w-auto group rounded-2xl bg-white hover:bg-gray-300 shadow-xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={ServicesData[currentIndex].img} alt={ServicesData[currentIndex].name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">{ServicesData[currentIndex].name}</h3>
            <p className="text-sm md:text-base text-gray-600">{ServicesData[currentIndex].description}</p>
          </div>
        </motion.div>
      </div>

      <div className="relative items-center justify-start space-x-4 overflow-x-auto hidden md:flex pl-0 pr-0">
        {ServicesData.slice(startIndex, endIndex).map((service) => (
          <motion.div
            key={service.id}
            className="max-w-[600px] w-full md:w-auto group rounded-2xl bg-white hover:bg-gray-300 shadow-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={service.img} alt={service.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-800">{service.name}</h3>
              <p className="text-sm md:text-base text-gray-600">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button className="px-3 py-1 md:px-4 md:py-2 bg-gray-300 rounded-full" onClick={goToPreviousSlide}>
          {'<'}
        </button>
        <button className="px-3 py-1 md:px-4 md:py-2 bg-gray-300 rounded-full" onClick={goToNextSlide}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Services;
