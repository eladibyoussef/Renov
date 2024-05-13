import React from 'react';
import { Link } from 'react-router-dom'; 

import image1 from '../../Assets/image 2.png';

function ProRenova() {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md py-24">
      <img src={image1} alt="Renovo Pro" className="w-48 h-auto mb-4" />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Become a RENOVO Pro
      </h1>
      <p className="text-lg text-center text-gray-600 mb-4">
        We're always looking for outstanding local contractors!
      </p>
      <Link to="/apply-now" className="bg-amber-600 hover:bg-orange-100 hover:text-black text-white font-bold py-2 px-4 rounded">
        Apply now
      </Link>
    </div>
  );
}

export default ProRenova;
