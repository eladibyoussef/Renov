import React from 'react';
import work1 from '../../Assets/work1.png';


const ServiceCard: React.FC = () => {
  return (
    <div className="md:h-full flex items-center text-gray-600">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {/* Card 1 */}
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col">
              <img
                className="lg:h-50 md:h-48 w-full object-cover object-center"
                src={work1}
                alt=""
              />
              <div className="p-6 hover:bg-cyan-600 hover:text-white transition duration-300 ease-in flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-2xl font-semibold">Cities are crowded</h1>
                  <button className="text-indigo-300 inline-flex items-center">
                    <ArrowDownIcon className="ml-1" />
                  </button>
                </div>
                <p className="leading-relaxed mb-3">Lorem ipsum dolor sit amet consectetur</p>
                <div className="flex justify-end">
                  
                </div>
              </div>
            </div>
          </div>
          {/* Ajoutez plus de cartes ici */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
