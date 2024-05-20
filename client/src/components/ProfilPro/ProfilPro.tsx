import { useState } from 'react';
import { FaBriefcase, FaCheck, FaStar } from 'react-icons/fa';
import Covert from '../../Assets/9.png';
import Profil from '../../Assets/img2.png';
import icon1 from "../../Assets/user-follow-fill.png";
import icon2 from "../../Assets/Vector (1).png"

const ProfilPro = () => {
  const [starCount] = useState(4);

  return (
    <>
      <div className="relative h-[200px] sm:h-[200px] bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <img
          alt=""
          className="w-full h-full object-cover"
          src={Covert}
          style={{ aspectRatio: '1200/300', objectFit: 'cover' }}
        />
      </div>

      <div className="relative -mt-16 sm:-mt-20 mx-4 sm:mx-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              className="w-40 h-40 sm:w-40 sm:h-40 border-4 border-white dark:border-gray-950 rounded-full"
              src={Profil}
              alt=""
            />
            <div className="grid gap-1">
              <h2 className="text-xl sm:text-2xl font-bold mt-16">Jared Palmer</h2>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FaBriefcase className="w-4 h-4" />
                <span className="pl-1">Plombier</span> 
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-yellow-500 ml-7">
          {[...Array(starCount)].map((_, index) => (
            <FaStar
              key={index}
              className={`w-5 h-5 ${index === starCount - 1 ? 'text-gray-300 dark:text-gray-600' : ''}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 justify-center">
          <div className="flex items-center">
            <img src={icon1} alt="" className="bg-[#BEEAEC] rounded-full p-2 w-10 h-10 " />
            <p className="text-sm p-4 ">Background Checked</p>
          </div>
          <div className="flex items-center">
            <img src={icon2} alt="" className="bg-[#BEEAEC] rounded-full p-2 w-10 h-10" />
            <p className="text-sm p-4">Insurance Coverage <br /> $1,000,000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilPro;
