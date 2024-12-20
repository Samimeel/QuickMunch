import React, { useState } from 'react'
import Navbar from './components/NavBar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Verify from './pages/verify/verify'
import Myorders from './pages/Myorders/Myorders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App