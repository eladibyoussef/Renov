import { Outlet } from "react-router-dom"
import BackOfficeSideBar from "../components/shared/BackOfficeSideBar"




const  BackOfficeLayout = () => {

  
  return (
    <div className="grid grid-cols-8 bg-customBlue   " >
      <div className=" hidden lg:block  lg:col-span-2 xl:col-span-1 ">
       <BackOfficeSideBar  />
      </div>
      <div className="  col-span-8 lg:col-span-6">
        
       {< Outlet />}

      </div>
       <div className=" col-span-1 h-screen bg-white hidden xl:block  ">right side notifications</div>
    </div>
  )
}

export default BackOfficeLayout
