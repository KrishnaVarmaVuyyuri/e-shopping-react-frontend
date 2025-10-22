import { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import CheckOut from './pages/CheckOut/CheckOut'
import Orders from './pages/Orders/Orders' 

import './App.css'
import Tracking from './pages/Tracking/Tracking'
import axios from 'axios'

function App() {
  const[cart,setCart]=useState([]) 

  const loadCart =async ()=>{
    const response = await axios.get("/api/cart-items?expand=product")
  setCart(response.data)
  }
  

  useEffect(()=>{
    loadCart()
  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={<Home cart={cart} loadCart={loadCart}/>}/>
      <Route path='/checkout' element={<CheckOut cart={cart} loadCart={loadCart}/>}/>
      <Route path='/orders' element={<Orders  cart={cart}/>}/>
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart} />} />
      <Route path='*' element={<div style={{background:"black",color:"white", alignItems:"center",display:"flex",justifyContent:"center", height:"650px", margin:"-8px", fontSize:"60px"}}>Page not Found</div>}/>
    </Routes>
    </>
  )
}

export default App
