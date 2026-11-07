import { useState } from 'react'
import Layout from './layouts/Layout'
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import ProductsDetails from './pages/ProductsDetails';
import Cart from './pages/Cart';
import AllProducts from './components/AllProducts'
function App() {



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/product-details/:id' element={<ProductsDetails />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/products' element={<AllProducts/>} />
      
      
      </Route>
    </Routes>
    
    
    </BrowserRouter>

    </>
  )
}

export default App
