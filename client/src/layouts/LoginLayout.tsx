import React, { useState } from 'react';

import homeRepaiTeam from '../Assets/home-repair-team.png';
import loginPic4 from '../Assets/loginPic4.jpg';
import logo2 from '../Assets/Logo2.png';

import loginPic5 from '../Assets/loginPic5.jpg';

import { Carousel } from 'antd';
import { Link, Outlet } from 'react-router-dom';

function LoginLayout() {
  return (
    <section className='h-screen bg-cyan-800 md:p-10 p-0 gap-2 grid grid-cols-2 '>

      <div className=' h-full w-full pt-5 hidden lg:block '>
      <div className="w-full h-[100px] left-[310px] top-[245px] text-white text-[64px] font-semibold font-poppins flex justify-center items-center gap-2 ">
          <img src={logo2} alt="" className="Logo w-13 h-13 pt-2"/>
          <Link to={'/'} className='w-80 h-24'>RENOVO</Link>
        </div>
      <Carousel autoplay  dotPosition='top' >
        <img src={loginPic4} className="w-full h-full  object-cover rounded-3xl " alt="" />
        <img src={homeRepaiTeam} className="w-full h-full object-cover rounded-3xl" alt="" />
        <img src={loginPic5} className="w-full h-full object-cover rounded-3xl" alt="" />
      </Carousel>
      </div>
      <div className=' lg:pr-20 lg:pl-28 col-span-2 lg:col-span-1  h-full w-full  '>
      <div className=' sm:bg-white h-full w-full  md:rounded-3xl bg-cyan-600'>
      <Outlet />

      </div>
      </div>
     
    </section>
  );
}

export default LoginLayout;
      