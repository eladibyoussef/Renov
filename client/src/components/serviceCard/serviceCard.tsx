import  { useState } from 'react';
import { Link } from 'react-router-dom';
import serviceImg from '../../Assets/1.png';

const CollapsibleCard = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`max-w-md mx-auto bg-white shadow-lg rounded-lg mt-8  ${isOpen ? 'h-auto' : 'h-64'}`}>
      <div className="relative">
        <img className="w-[280px] h-[200px]" src={serviceImg} alt="Service" />
        <div className="absolute top-0 left-0 p-4">
          <h2 className="text-black bg-gradient-to-r from-white to-slate-300 p-1 px-4 rounded-lg text-lg font-bold">{service.name}</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          {isOpen ? (
            <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px' }} className="scrollbar">
              {service.subCategories.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  to={`/${subCategory.name}`}
                  className="block text-sm font-semibold text-blue-700 p-2 mb-2 hover:underline"
                >
                  {subCategory.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <button
          className={`block w-full text-center bg-gray-200 hover:bg-gray-300 p-2 mt-${isOpen ? '2' : '4'}`}
          onClick={toggleCard}
        >
          {isOpen ? 'Close ▲' : 'Services Available ▼'}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleCard;
