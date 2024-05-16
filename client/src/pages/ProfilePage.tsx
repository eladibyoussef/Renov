import ProfilPro from "../components/ProfilPro/ProfilPro"
import ServicesPro from "../components/ProfilPro/ServicesPro"
import Contact from "../components/ProfilPro/Contact"
import Poste from "../components/ProfilPro/Poste"

function ProfilePage() {
  return (
    <div className="">
      <ProfilPro />
      <div className="grid grid-cols-1  sm:grid-cols-2">
        <div className="sm:col-span-1">
          <ServicesPro />
        </div>
        <div className="sm:col-span-1 mt-8 sm:mt-0">
          <Contact />
        </div>

        <div className="sm:col-span-2 flex justify-center"> 
          <div>
            <h1 className="text-3xl font-bold text-center my-8">My Social Media Feed</h1>
            <Poste />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
