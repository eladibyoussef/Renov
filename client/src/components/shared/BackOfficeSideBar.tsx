import { Link , useLocation } from 'react-router-dom'

import Logo from '../../Assets/Logo.png'
import { BiHomeAlt ,BiUser, BiHelpCircle } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdOutlineHomeRepairService , MdOutlinePayment } from "react-icons/md";
import { TbShoppingCartSearch } from "react-icons/tb";
import { IoChatbubblesOutline , IoSettingsOutline} from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";

import { CiLogout } from "react-icons/ci";
import React ,  { useState  } from 'react';

const linkClass =
	'flex items-center gap-2 font-Outfit text-customGrey font-normal  px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

  const activeLinkClass = 'text-gray-900 ';
function BackOfficeSideBar() {
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState(location.pathname); 

  const handleSetActiveLink = (path: React.SetStateAction<string>) => {
    setActiveLink(path);
    console.log(activeLink)
  };
  return (
    <div className=" relative flex flex-col   h-screen bg-white p-5   " >
      <div className=" flex items-center justify-center gap-2 py-3 mb-10 mt-10 ">
        <img src={Logo} alt="" />
      <Link to={'/'}><p className=" font-inter   text-2xl ">Renovo</p></Link>
      </div>
      <div className=" flex-1">
        <Link to={'/backoffice'}  onClick={() => handleSetActiveLink('/backoffice')}  className={`${linkClass} ${activeLink === '/backoffice' ? activeLinkClass : ''}  `} > <span><BiHomeAlt /></span> Home</Link>
        <Link to={'/backoffice/users'} onClick={() => handleSetActiveLink('/backoffice/users')}  className={`${linkClass} ${activeLink === '/backoffice/users' ? activeLinkClass : ''}`} > <span><BiUser /></span> Users</Link>
        <Link to={'/backoffice/professionals'} onClick={() => handleSetActiveLink('/backoffice/professionals')}  className={`${linkClass} ${activeLink === '/backoffice/professionals' ? activeLinkClass : ''}`}> <span><MdOutlineHomeRepairService /></span> Professionals</Link>
        <Link to={'/backoffice/sellers'} onClick={() => handleSetActiveLink('/backoffice/sellers')}  className={`${linkClass} ${activeLink === '/backoffice/sellers' ? activeLinkClass : ''}`}> <span><AiOutlineUserSwitch /></span> Sellers</Link>
        <Link to={'/backoffice/orders'} onClick={() => handleSetActiveLink('/backoffice/orders')}  className={`${linkClass} ${activeLink === '/backoffice/orders' ? activeLinkClass : ''}`}> <span><TbShoppingCartSearch /></span> orders</Link>
        <Link to={'/backoffice/products'} onClick={() => handleSetActiveLink('/backoffice/products')}  className={`${linkClass} ${activeLink === '/backoffice/products' ? activeLinkClass : ''}`}> <span><LiaToolsSolid /></span> Products</Link>

        <Link to={'/backoffice/payment'} onClick={() => handleSetActiveLink('/backoffice/payment')}  className={`${linkClass} ${activeLink === '/backoffice/payment' ? activeLinkClass : ''}`}> <span><MdOutlinePayment /></span> Payment</Link>
        <Link to={'/backoffice/chats'}  onClick={() => handleSetActiveLink('/backoffice/chats')}  className={`${linkClass} ${activeLink === '/backoffice/chats' ? activeLinkClass : ''}`}> <span><IoChatbubblesOutline /></span> chats</Link>
        <Link to={'/backoffice/settings'} onClick={() => handleSetActiveLink('/backoffice/settings')}  className={`${linkClass} ${activeLink === '/backoffice/settings' ? activeLinkClass : ''}`}> <span><IoSettingsOutline /></span> Settings</Link>




      </div>
      <div>
      <Link to={'/backoffice/help'} className={linkClass}> <span><BiHelpCircle /></span> Help & infprmation</Link>
      <Link to={'/backoffice/logout'} className={linkClass}> <span><CiLogout /></span> Logout</Link>

      </div>
    </div>
  )
}

export default BackOfficeSideBar
