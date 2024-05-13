import React, { useEffect, useState, useRef } from 'react';

function Stepper({ steps, currentStep }) {
  const [newSteps, setNewSteps] = useState([]);
  const stepsRef = useRef([]);

  useEffect(() => {
    // Initialise les étapes et les stocke dans stepsRef.current
    const initialSteps = steps.map((step, index) => ({
      description: step,
      completed: index < currentStep - 1,
      highlighted: index === currentStep - 1,
      selected: index === currentStep - 1
    }));
    stepsRef.current = initialSteps;
    setNewSteps(initialSteps);
  }, [steps, currentStep]);

  useEffect(() => {
    // Met à jour les étapes chaque fois que currentStep change
    const updatedSteps = stepsRef.current.map((step, index) => ({
      ...step,
      completed: index < currentStep - 1,
      highlighted: index === currentStep - 1,
      selected: index === currentStep - 1
    }));
    setNewSteps(updatedSteps);
  }, [currentStep]);

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {newSteps.map((step, index) => (
        <div key={index} className={` w-96 flex items-center ${index !== newSteps.length - 1 ? 'border-b-2' : ''}`}>
          <div className="relative flex flex-col items-center text-teal-600">
            <div className={`rounded-full transition duration-500 ease-in-out border-2 ${step.highlighted ? 'border-teal-600' : 'border-gray-300'} h-12 w-12 flex items-center justify-center py-3 font-semibold ${step.completed ? 'text-gray-600' : 'text-teal-600'}`}>
              {step.completed ? <i className="fas fa-check"></i> : index + 1}
            </div>
            <div className="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
