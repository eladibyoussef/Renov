import React from 'react';
import logo2 from '../Assets/Logo2.png';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';




    
     

const LoginLayout: React.FC = () => {

  return (
    <section className='md:grid md:grid-cols-2 h-screen bg-cyan-800 lg:gap-80 gap-0 md:gap-40 sm:gap-0 '>
      <div className="col-span-1 md:flex flex-col justify-center ml-44 items-center">
        <div className="w-[334px] h-[100px] left-[310px] top-[245px] text-white text-[64px] font-semibold font-poppins flex justify-center items-center gap-2">
          <img src={logo2} alt="" className="Logo w-13 h-13 pt-2"/>
          <Link to={'/'} className='w-80 h-24'>RENOVO</Link>
        </div>
        {/* carousel */}
        {/* <CarouselComponent settings={settings} /> */}
      </div>
      <Outlet />
    </section>
  );
}

export default LoginLayout;
