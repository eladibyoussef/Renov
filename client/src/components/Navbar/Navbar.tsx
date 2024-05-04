import React, { useState } from 'react';
import Logo from '../../Assets/Logo.png';
import { IoMdSearch } from 'react-icons/io';
import { AiOutlineTool, AiOutlineShop, AiOutlineBulb, AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='shadow-md bg-slate-500 '>
      <div className='bg-white py-3'>
        <div className='container flex justify-between items-center'>

          <Link to='/' className='font-bold text-xl sm:text-xl flex gap-2 items-center'>
            <img src={Logo} alt='Logo' className='w-7 uppercase' />
            RENOVO
          </Link>

          <div className='hidden sm:flex gap-5 items-center'>
            <motion.button
              className='text-gray-700 font-bold hover:text-primary focus:outline-none flex items-center'
              whileHover={{ scale: 1.1 }}
            >
              <AiOutlineTool className='mr-2' />
              <Link to='/services'>Services</Link>
            </motion.button>
            <motion.button
              className='text-gray-700 font-bold hover:text-primary focus:outline-none flex items-center'
              whileHover={{ scale: 1.1 }}
            >
              <AiOutlineShop className='mr-2' />
              <Link to='/ShopAll'>Shop All</Link>
            </motion.button>
            <motion.button
              className='text-gray-700 font-bold hover:text-primary focus:outline-none flex items-center'
              whileHover={{ scale: 1.1 }}
            >
              <AiOutlineBulb className='mr-2' />
              <Link to='/DiY'>DIY</Link>
            </motion.button>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search'
                className='w-64 rounded-full border border-gray-300 px-2 py-1 focus:border-primary'
              />
              <IoMdSearch className='text-gray-500 absolute top-1/2 -translate-y-1/2 right-3 search-icon' />
            </div>
            <motion.button
              className='text-white bg-slate-950 py-1 px-4 rounded-full'
              whileHover={{ scale: 1.1 }}
            >
              <Link to='/login'>Login</Link>
            </motion.button>
            <motion.button
              className='text-white bg-slate-950 py-1 px-4 rounded-full'
              whileHover={{ scale: 1.1 }}
            >
              <Link to='/signup'>Sign Up</Link>
            </motion.button>
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
                className='lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit p-4 rounded-lg z-10'
              >
                <Link to='/services' className="hover:text-white cursor-pointer" onClick={closeMenu}>Services</Link>
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