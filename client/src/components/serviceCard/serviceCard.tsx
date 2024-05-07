import  { useState } from 'react';

const CollapsibleCard = () => {
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD
  const options = [
    {
      title: 'Option 1',
      subOptions: ['Sub Option 1', 'Sub Option 2', 'Sub Option 3']
    },
    {
      title: 'Option 2',
      subOptions: ['Sub Option A', 'Sub Option B', 'Sub Option C']
    }
  ];
=======
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

const ServiceCard: React.FC = (ServiceCard) => {
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
>>>>>>> products-management

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 ms-8">
      <div className="relative">
        <img className="w-[280px] h-[200px]" src="https://source.unsplash.com/random" alt="Service" />
        <div className="absolute top-0 left-0 p-4">
          <h2 className="text-white text-lg font-bold">Service Title</h2>
        </div>
      </div>
      <div className="p-4">
        {isOpen && (
          <div>
            {options.map((option, index) => (
              
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-center">{option.title}</h3>
                <button className=''>
                <ul className=" list-inside">
                  {option.subOptions.map((subOption, subIndex) => (
                    <li key={subIndex}>{subOption}</li>
                  ))}
                </ul>
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="block w-full text-center bg-gray-200 hover:bg-gray-300 p-2 mt-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Collapse ▲' : 'Open ▼'}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleCard;
