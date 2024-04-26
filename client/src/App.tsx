import React from 'react'
import './App.css'
import LandingPage from './pages/landingPage'
import { Routes , Route } from 'react-router-dom'
import PageServices from './pages/PageServices'
import PageShopAll from './pages/PageShopAll'
import PageDiY from './pages/PageDiY'
import InterfaceLayout from './layouts/InterfaceLayout'

function App() {
 return (
 <Routes>
      <Route path='/' element={<InterfaceLayout />}>
            
       <Route index element={<LandingPage />} />
       <Route path="/services" element={<PageServices />} />
       <Route path="/ShopAll" element={<PageShopAll />} />
       <Route path="/DiY" element={<PageDiY />} />
      </Route>
 </Routes>
 )
}
export default App 
