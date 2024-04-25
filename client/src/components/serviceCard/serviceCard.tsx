import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import work1 from '../../Assets/work1.png';

interface Props {
  isOpen: boolean;
}

const ArrowDownIcon: React.FC<Props> = ({ isOpen }) => (
  <svg
    className="w-4 h-4 inline-block cursor-pointer"
    viewBox="0 0 24 24"
    fill={isOpen ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const ServiceCard: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSubOptionClick = (option: string) => {
    console.log('Option clicked:', option);
  };

  const subOptions = {
    Option1: ['SubOption1', 'SubOption2'],
    Option2: ['SubOption3', 'SubOption4']
  };

  return (
    <div className="md:h-full flex items-center text-black">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="p-4 sm:w-1/2 lg:w-1/3">
            <div className="h-full border-2 border-opacity-60 rounded-lg overflow-hidden flex flex-col relative">
              <img className="w-full h-50 object-cover object-center" src={work1} alt="Work" />
              <div className="p-6">
                <h1 className="text-xl mb-2 text-cyan-800 font-bold">Cities are crowded</h1>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                <div className="flex items-center justify-between">
                  <button
                    className="flex items-center text-gray-500 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <span className="mr-2">Services Available</span>
                    <ArrowDownIcon isOpen={isDropdownOpen} />
                  </button>
                </div>
                <Transition
                  show={isDropdownOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  {(ref) => (
                    <div ref={ref} className="mt-4 border-t pt-4">
                      {Object.entries(subOptions).map(([option, subs]) => (
                        <div key={option}>
                          <div
                            className="block w-full text-center py-2 text-gray-800 hover:bg-sky-700 hover:text-white rounded-md focus:outline-none"
                          >
                            {option}
                          </div>
                         
                          {subs.map((sub, subIndex) => (
                            <button
                              key={subIndex}
                              className="block w-full text-left py-2 text-gray-600 hover:bg-gray-100 focus:outline-none pl-8"
                              onClick={() => handleSubOptionClick(sub)}
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

