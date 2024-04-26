import React from 'react';
import searchIcon from '../assets/searchIcon.png';
import { CiLight } from 'react-icons/ci';
import { SlBell } from 'react-icons/sl';
import { MdHistory } from 'react-icons/md';
import { PiNotebookDuotone } from 'react-icons/pi';
import { ImStarEmpty } from 'react-icons/im';
import BackOfficeSideBar from "../components/BackOfficeSideBar"
import { useState  } from "react"
import { FiMenu } from 'react-icons/fi'; 
import '../index.css'


interface BackofficeHeaderProps {
  currentPage: string; 
}

const BackofficeHeader: React.FC<BackofficeHeaderProps> = ({ currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 
  return (
    <>
    <section className="md:col-span-6 flex flex-col sm:col-span-8 relative  ">
      <div className='flex justify-between bg-white p-3 '>
        <div className='relative flex justify-center items-center gap-2'>
          <PiNotebookDuotone />
          <ImStarEmpty />
          <p style={{ color: '#B5B7C0' }}>dashboard</p>
          <span style={{ color: '#B5B7C0' }}>/</span>
          <p className='font-Poppins font-medium'>{currentPage}</p>
        </div>

        <div className="md:hidden flex items-center justify-center">
          <FiMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        <div className='relative  justify-center items-center gap-1 hidden md:flex'>
          <div className='relative'>
            <input type='text' placeholder='search' className='w-40 h-7 bg-customBlue   rounded-lg pl-5' />
            <img src={searchIcon} alt='' className='absolute top-2' />
          </div>
          <CiLight className='w-5 h-5 rounded-lg' />
          <MdHistory />
          <SlBell />
          <PiNotebookDuotone />
        </div>
      </div>
      <hr className='border-customGrey mr-5 ml-5' />
      <div className="bg-white  border ">
        <h1 className="font-Poppins font-bold p-8 ">{currentPage} Management</h1>
        <hr className="border-t-8 border-customPurple w-72 rounded-full" />
      </div>
      {isSidebarOpen && (
          <div className='fixed inset-0 z-10 bg-gray-800 bg-opacity-50' onClick={toggleSidebar}>
          </div>
        )}
      {isSidebarOpen && <div  className=' absolute z-50 right-1/3 top-1/3 overflow-y-auto max-h-[500px] md:hidden rounded-lg hide-scrollbar '>
        <BackOfficeSideBar /> 
      </div>}
    </section>
  
    </> );
};

export default BackofficeHeader;
