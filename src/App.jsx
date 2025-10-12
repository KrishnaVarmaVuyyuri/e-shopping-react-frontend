import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import CheckOut from './pages/CheckOut/CheckOut'
import './App.css'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
    </Routes>
    </>
  )
}

export default App
