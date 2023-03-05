import React from 'react'
import { Link, Routes, Route } from 'react-router-dom';


import ProductDetails from './ProductDetails';

const Product = ({ products }) => {

 const  {image, slug, details, name, price} = products ;

  return (
    <div>
    
     
   
      <Routes>
      
    

       <Route path={`/product/${slug.current}`} element={<ProductDetails products = {products} />} />
       </Routes>


    </div>
  )
}

export default Product