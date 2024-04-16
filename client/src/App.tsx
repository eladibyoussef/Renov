import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BackOfficeLayout from "./layouts/BackOfficeLayout";
import BackOfficeDashboard from "./components/BackOfficeDashboard";
import UserManagement from './components/UserManagement';


function App() {
  return (
     <Routes>
      <Route path="/backoffice" element={<BackOfficeLayout />} >
         <Route index element={<BackOfficeDashboard />} />
         <Route path='users' element={<UserManagement />}/>

      </Route>


     </Routes>



  );
}

export default App;
