import { Outlet } from "react-router-dom"
import BackOfficeSideBar from "../components/BackOfficeSideBar"
function BackOfficeLayout() {
  return (
    <div className="grid grid-cols-8 bg-customBlue gap-2" >
       <BackOfficeSideBar />
       {< Outlet />}
       <div className=" col-span-1">right side notifications</div>
    </div>
  )
}

export default BackOfficeLayout
