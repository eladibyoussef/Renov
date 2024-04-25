import React from 'react'
import './App.css'
import LandingPage from './pages/landingPage'
import { Routes , Route } from 'react-router-dom'

function App() {
 return (
 <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/services" element={<LandingPage />} />
 </Routes>
 )
}
export default App
