import { useState, useEffect } from 'react';

function ServicesPro() {
  const services = [
    'Backflow Preventer',
    'Pipe Repair',
    'Fixture Installation',
    'Water Heater',
    'Drain Cleaning',
    'Leak Detection',
    'Plumbing Inspections',
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const determineColumns = () => {
    if (windowWidth >= 1024) {
      return 3; 
    } else if (windowWidth >= 768) {
      return 2; 
    } else {
      return 1; 
    }
  };

  return (
    <div className="mx-auto py-8 sm:mt-9 sm:ml-9 sm:mr-9">
      <div className="bg-white rounded-2xl border  shadow-lg p-6 ">
        <h1 className="text-2xl font-bold mb-6">Services Offered</h1>

        <div className={`grid grid-cols-${determineColumns()} gap-4   `}>
          {services.map((service, index) => (
            <div key={index} className="bg-gray-200 rounded-full shadow-md p-1 text-center   ">
              <p className="text-lg font-semibold">{service}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPro;
