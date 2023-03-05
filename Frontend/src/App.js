
import React, {  useEffect, useState } from "react";
import { Route, Routes } from "react-router";


import FooterBanner from "./component/FooterBanner";
import HeroBanner from "./component/HeroBanner";
import Product from "./component/Product";

import AllProduct from "./component/AllProduct";

import Success from "./component/Success";
import UserLogin from "./component/UserLogin";
import Shipping from "./component/OrderCheckOut/Shipping";
import ConfirmOrder from './component/OrderCheckOut/ConfirmOrder'
import client from './lib/client'


function App() {


 

  const[product,  setProduct]= useState([]); 

  const[banner,  setBanner]= useState([]); 

  const[Allproduct,  setAllproduct]= useState([]); 

  useEffect(()=> {

   const query = '*[_type == "product" && category == "Audio" ]' ;
  
   client.fetch(query)
     .then((data) => setProduct(data)); 



 const bannerQuery = '*[_type == "banner" ]' ; 

     client.fetch(bannerQuery)
     .then(data => setBanner(data) )


  
     const allproductQuery = '*[_type == "product" ]' ;   

     client.fetch(allproductQuery)
     .then(data => setAllproduct(data) )


  }, [] );

  const handelCategory = (event) => {


   const query = `*[_type == "product" && category == "${event}" ]` ;
  
   client.fetch(query)
     .then((data) => setProduct(data)); 

    
     


  }
  

  return (
    <React.Fragment>



    <Routes>

     <Route  path = '/' element = {

    <div>
   

    <div> <HeroBanner heroBanner = {banner.length >0 && banner[0] }/>
     
   

      <div className="category">
      <button className="category-container" onMouseEnter={()=> {handelCategory("Audio")} } ><h1>Audio</h1></button>
      <button className="category-container" onMouseEnter={()=> {handelCategory("Shoes")} } ><h1>Shoes</h1></button>
      <button className="category-container" onMouseEnter={()=> {handelCategory("Clothes")} } ><h1>Clothes</h1></button>
      <button className="category-container" onMouseEnter={()=> {handelCategory("Watches")} } ><h1>Watches</h1></button>
      </div>

      
      <div className="products-heading">
      <h2>Best Seller Product</h2>
      <p>Sound like heaven</p>
      </div>
     
      </div>
      
      

     
      <div className="products-container">
      { product?.map(data =>        
         <AllProduct
          key = {data._id}
          products = {data}

          />

       )
      
      }

      </div>




      </div>
      
       }  />

      </Routes>



      <div >
      { Allproduct?.map(data =>        
         <Product
          key = {data._id}
          products = {data}

          />

       )
      
      }

      </div>
      

      <Routes>

      <Route path="/" element = {<FooterBanner footerBanner ={banner.length >0  && banner[0]} />} />
      <Route path="/Success" element = {<Success/>}/>
      <Route path="/UserLogin/*" element = {<UserLogin/>}/>
      <Route path="/ShippingDetails" element = {<Shipping />} />
      <Route path = '/confirmOrder' element = {<ConfirmOrder/>} />

      </Routes>
     
      
    </React.Fragment>
  );
}

export default App;
