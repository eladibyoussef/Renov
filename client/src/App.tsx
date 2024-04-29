
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
// import ProForm from './componenet/ProForm'
import SignUpForm from './componenet/signUp';
import LoginContainer from './componenet/login';
import LoginLayout from './layouts/LoginLayout';
import { Route, Routes } from 'react-router-dom';

import BackOfficeLayout from "./layouts/BackOfficeLayout";
import BackOfficeDashboard from "./components/BackOfficeDashboard";
import UserManagement from './components/UserManagement';
import ProfessionalManagement from './components/ProfessionalManagenemt';
 import LandingPage from './pages/landingPage'
  import PageServices from './pages/PageServices'
import PageShopAll from './pages/PageShopAll'
import PageDiY from './pages/PageDiY'
import InterfaceLayout from './layouts/InterfaceLayout'




function App() {
  return (
     <Routes>
      <Route path="/backoffice" element={<BackOfficeLayout />} >
         <Route index element={<BackOfficeDashboard />} />
         <Route path='users' element={<UserManagement />}/>
         <Route path='professionals' element = {<ProfessionalManagement />} />

      </Route>
         <Route path='/' element={<InterfaceLayout />}>
            
       <Route index element={<LandingPage />} />
       <Route path="/services" element={<PageServices />} />
       <Route path="/ShopAll" element={<PageShopAll />} />
       <Route path="/DiY" element={<PageDiY />} />
      </Route>
      
       <Route path='/login' element={<LoginLayout/>}>
          <Route index element={<LoginContainer/>} />
          <Route path='signup' index element={<SignUpForm/>}/>
        
        </Route>
       


     </Routes>



  );
}

export default App;
