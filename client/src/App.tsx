
import './App.css'
// import ProForm from './componenet/ProForm'
import SignUpForm from './componenet/signUp';
import LoginContainer from './componenet/login';
import LoginLayout from './layouts/LoginLayout';
import { Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
    return (
      <Routes>
        <Route path='/' element={<LoginLayout/>}>
          <Route index element={<LoginContainer/>} />
          <Route path='signup' index element={<SignUpForm/>}/>
        
        </Route>
       


      </Routes>
      
      
    )
  }

export default App
