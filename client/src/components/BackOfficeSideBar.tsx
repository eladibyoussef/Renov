import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { BiHomeAlt ,BiUser, BiHelpCircle } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdOutlineHomeRepairService , MdOutlinePayment } from "react-icons/md";
import { TbShoppingCartSearch } from "react-icons/tb";
import { IoChatbubblesOutline , IoSettingsOutline} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

const linkClass =
	'flex items-center gap-2 font-Outfit text-customGrey font-normal  px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

function BackOfficeSideBar() {
  return (
    <div className=" relative flex flex-col col-span-1  h-screen bg-white" >
      <div className=" flex items-center justify-center gap-2 py-3 mb-10 mt-10 ">
        <img src={Logo} alt="" />
      <p className=" font-inter   text-2xl ">Renovo</p>
      </div>
      <div className=" flex-1">
        <Link to={'/backoffice'} className={linkClass}> <span><BiHomeAlt /></span> Home</Link>
        <Link to={'/backoffice/users'} className={linkClass}> <span><BiUser /></span> users</Link>
        <Link to={'/backoffice/professionals'} className={linkClass}> <span><MdOutlineHomeRepairService /></span> professionals</Link>
        <Link to={'/backoffice/sellers'} className={linkClass}> <span><AiOutlineUserSwitch /></span> sellers</Link>
        <Link to={'/backoffice/orders'} className={linkClass}> <span><TbShoppingCartSearch /></span> orders</Link>
        <Link to={'/backoffice/payment'} className={linkClass}> <span><MdOutlinePayment /></span> payment</Link>
        <Link to={'/backoffice/chats'} className={linkClass}> <span><IoChatbubblesOutline /></span> chats</Link>
        <Link to={'/backoffice/settings'} className={linkClass}> <span><IoSettingsOutline /></span> settings</Link>




      </div>
      <div>
      <Link to={'/backoffice/help'} className={linkClass}> <span><BiHelpCircle /></span> Help & infprmation</Link>
      <Link to={'/backoffice/logout'} className={linkClass}> <span><CiLogout /></span> Logout</Link>

      </div>
    </div>
  )
}

export default BackOfficeSideBar
