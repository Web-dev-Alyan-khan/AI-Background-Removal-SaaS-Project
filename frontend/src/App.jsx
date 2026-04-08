import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navber from './components/Navber'
import Footer from './components/Footer'
// --- Toastify Imports ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'


const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Configuration for the toasts */}
      <ToastContainer position='bottom-right' />
      
      <Navber/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result/>} />
        <Route path="/buy" element={<BuyCredit/>} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App