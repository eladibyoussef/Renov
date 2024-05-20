import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/Logo.png';
import { IoMdSearch } from 'react-icons/io';
import { AiOutlineTool, AiOutlineShop, AiOutlineBulb, AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { isAuthenticated  , logout} from '@/Utils/login';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className= {`shadow-md   ${isScrolled ? 'fixed top-0 left-0 w-full z-50' : ''}` }>
      <div className='bg-white py-3 '>
        <div className='flex justify-between items-center'>

          <Link to='/' className='font-bold text-xl sm:text-xl flex gap-2 items-center ml-4'>
            <img src={Logo} alt='Logo' className='w-7 uppercase ml-5 md:ml-0' />
            RENOVO
          </Link>

          <div className='hidden md:flex gap-5 items-center'> 
            <motion.button
              className='text-gray-700  font-bold hover:text-primary focus:outline-none flex items-center transition-transform duration-300 transform-gpu hover:scale-110'
            >
              <AiOutlineTool className='mr-2' />
              <Link to='/services'>Services</Link>
            </motion.button>
            <motion.button
              className='text-gray-700 font-bold hover:text-primary focus:outline-none flex items-center transition-transform duration-300 transform-gpu hover:scale-110'
            >
              <AiOutlineShop className='mr-2' />
              <Link to='/ShopAll'>Shop All</Link>
            </motion.button>
            <motion.button
              className='text-gray-700 font-bold hover:text-primary focus:outline-none flex items-center transition-transform duration-300 transform-gpu hover:scale-110'
            >
              <AiOutlineBulb className='mr-2' />
              <Link to='/DiY'>DIY</Link>
            </motion.button>
            <div className='relative mr-52'>
              <input
                type='text'
                placeholder='Search'
                className='w-64 rounded-full border border-gray-300 px-2 py-1 focus:border-primary'
              />
              <IoMdSearch className='text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 search-icon' />
            </div>
           { !isAuthenticated() && <><motion.button
              className='text-white bg-slate-950 py-1 px-4 rounded-full'
              whileHover={{ scale: 1.1 }}>

            {/* // <motion.button
              className='text-white bg-slate-950  py-1 px-4 rounded-full hover:scale-110 transition-transform duration-300 transform-gpu'
            > */}
              <Link to='/login'>Login</Link>
            </motion.button>
            <motion.button
              className='text-white bg-slate-950 mr- py-1 px-4 rounded-full hover:scale-110 transition-transform duration-300 transform-gpu'
            >
              <Link to='/login/signup'>Sign Up</Link>
            </motion.button></>}
            {isAuthenticated() && <> <motion.button
              className='text-white bg-slate-950 py-1 px-4 rounded-full'
              whileHover={{ scale: 1.1 }}
            >
              <Link to='/login' onClick={()=>{logout()}}>Log Out</Link>
            </motion.button> 
            <Space size={24}>
    <Badge count={0}>
      <Avatar shape="square" icon={<UserOutlined />} />
    </Badge>
    
  </Space>
            
            </> }
          </div>

          <div className='md:hidden flex items-center'> 
            <button onClick={toggleMenu} className='text-gray-700 hover:text-primary focus:outline-none'>
              {menuOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenuUnfold size={25} />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className='md:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit p-4 rounded-lg z-10'
              >
                <Link to='/services' className="hover:text-white cursor-pointer " onClick={closeMenu}>Services</Link>
                <Link to='/shop-all' className="hover:text-white cursor-pointer" onClick={closeMenu}>Shop All</Link>
                <Link to='/diy' className="hover:text-white cursor-pointer" onClick={closeMenu}>DIY</Link>
                <Link to='/login' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => alert('Login clicked')}>
                  Login
                </Link>
                <Link to='/signup' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Sign Up clicked')}>
                  Sign Up
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
