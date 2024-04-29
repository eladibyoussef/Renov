import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/footer'

function InterfaceLayout() {
  return (
    <div className="min-h-screen">
    <div className="max-w-screen-xl mx-auto">
    <Navbar />
    <Outlet />
    <Footer />
    </div>
    </div>
  )
}

export default  InterfaceLayout
