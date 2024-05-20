import React from 'react';
import { motion } from 'framer-motion';
import plumbing from "../../Assets/plumbing.png";
import GH1 from "../../Assets/GH 1.png";

const Hero: React.FunctionComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='min-h-[550px] sm:min-h-[600px] flex justify-center items-center flex-col '
    >
      <div className='container pb-8 sm:pb-0'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left'>
            <h1 className='md:text-5xl sm:text-2xl p-1 bg-clip-text font-black text-4xl'>Repair, Building, Construction & More..</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sit illum iure ducimus aut sed labore inventore debitis provident, </p>
            <div>
              <button className='py-1 px-4 rounded-md bg-[#385EA8] transition duration-150 hover:bg-[#2A4365] text-white'>more..</button>
            </div>
          </div>
          <div className='min-h-[250px] flex justify-center items-center relative order-1 sm:order-2'>
            <img src={plumbing} alt="" className='max-w-[350px] w-full mx-auto sm:scale-125' />
          </div>
        </div>
      </div>
      {/* Barre bleue visible uniquement sur les écrans larges (lg) */}
      <div className="h-[100px] bg-[#385EA8] p-5 hidden lg:block">
        <div className='flex gap-2'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col mt-6 ml-2 px-8 text-gray-700 bg-white shadow-md bg-clip-border w-72"
          >
            <div className="p-4 pl-2 flex items-center">
              <img src={GH1} alt="" className="w-6 h-6 mr-2 mb-12" />
              <div>
                <h5 className="font-cursive text-xl font-semibold leading-snug text-blue-gray-900">Book Online</h5>
                <p className="pl-2 font-sans text-base font-light leading-relaxed">Lorem ipsum dolor sit amet csect</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col mt-6 ml-2 px-8 text-gray-700 bg-white shadow-md bg-clip-border w-72"
          >
            <div className="p-4 pl-2 flex items-center">
              <img src={GH1} alt="" className="w-6 h-6 mr-2 mb-12" />
              <div>
                <h5 className="font-cursive text-xl font-semibold leading-snug text-blue-gray-900">Book Online</h5>
                <p className="pl-2 font-sans text-base font-light leading-relaxed">Lorem ipsum dolor sit amet csect</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col mt-6 ml-2 px-8 text-gray-700 bg-white shadow-md bg-clip-border w-72"
          >
            <div className="p-4 pl-2 flex items-center">
              <img src={GH1} alt="" className="w-6 h-6 mr-2 mb-12" />
              <div>
                <h5 className="font-cursive text-xl font-semibold leading-snug text-blue-gray-900">Book Online</h5>
                <p className="pl-2 font-sans text-base font-light leading-relaxed">Lorem ipsum dolor sit amet csect</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex flex-col mt-6 ml-2 px-8 text-gray-700 bg-white shadow-md bg-clip-border w-72"
          >
            <div className="p-4 pl-2 flex items-center">
              <img src={GH1} alt="" className="w-6 h-6 mr-2 mb-12" />
              <div>
                <h5 className="font-cursive text-xl font-semibold leading-snug text-blue-gray-900">Book Online</h5>
                <p className="pl-2 font-sans text-base font-light leading-relaxed">Lorem ipsum dolor sit amet csect</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
