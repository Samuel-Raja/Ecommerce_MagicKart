import React, {  useState, useEffect } from 'react'
import urlFor from '../imageUrl';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import AllProduct from './AllProduct';

import client from '../lib/client';
//import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router';
import { createUserCart } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addedProductOncart, updateCartItem } from '../State/productData';
//import { useNavigate } from 'react-router';
import {useNavigate} from "react-router-dom"

 
const ProductDetails = ({products}) => {

  

  const isLoggedin = useSelector(state => state.userdata.IsUserLoggedin);

  const token = useSelector(state => state.userdata.token);

  const cartItem = useSelector(state => state.productdata.cartItem );

  

  const navigate =  useNavigate()

  const [isLoading, setisLoading] = useState(false);

  

  const  {image,  details, name, price, category } = products ;

  const [imageIndex, setImageIndex] = useState(0);

  const [qty, setqty] = useState(1);


  const[product,  setProduct]= useState([]); 

  const dispatch = useDispatch();



  useEffect(()=> {

   const query = `*[_type == "product" && category == "${category}" ]` ;
  
   client.fetch(query)
     .then((data) => setProduct(data)); 

  }, [category] );



  const increaseQuantity = () =>
  {
      setqty(prev => prev + 1);
  }

  const decreaseQuantity = () =>
  {
     if(qty === 1 )
     {
        return setqty(1);
     } 

     else
     return setqty(prev => prev - 1);
  }


  

  const onAdd = () => {

    
       dispatch(addCart(qty));

      dispatch(addedProductOncart({p:products, q: qty }))

     //toast.success('successful');

     const checkProductIsPresent = cartItem.find(item => item._id === products._id);

     

      if(checkProductIsPresent)
      {

        // console.log(cartItem)

          const UpdatedProduct = {...checkProductIsPresent, productQty: qty + checkProductIsPresent.productQty  } 

        // const UpdateCartItem = [...cartItem, UpdatedProduct]

         console.log(UpdatedProduct);

        const UpdatedCartItem = cartItem.map(item => {
          
          if(item._id === products._id)
           {
             return UpdatedProduct;
 
             }
 
            return item ;
             
           }
 
       );

       console.log(UpdatedCartItem)
        
        createUserCart(token, UpdatedCartItem  );

      }

      else
      {

       
        const UpdatedProduct = {...products, productQty : qty }  

         const UpdatedCartItem = [...cartItem, UpdatedProduct ]

       // const UpdatedCartItem = cartItem.push(UpdatedProduct);

         createUserCart(token, UpdatedCartItem);

      }


  }


  const handleBuyCheckout = async () => {


    const UpdatedProduct = {...products, productQty: qty }

     isLoggedin ? navigate('/ShippingDetails', {state : [UpdatedProduct]}  ) : navigate('/UserLogin/auth', {state : [UpdatedProduct]} )  

    

    


   
}





  return (
    <div>
      <div className='product-detail-container'>
      <div>
        <div >
          <img src= {image && urlFor(image[imageIndex]).url()} alt="headphone"  className='product-detail-image'  />
        </div>
        <div className='small-images-container'>
          { image?.map((item, i) => (
             
             <img
              src= {item && urlFor(item).url()}
               alt = "Headphone"
               className= { i === imageIndex ? 'small-image selected-image' : 'small-image' }
               onMouseEnter={() => setImageIndex(i)}

              
             />
            
          ) )
          
           }

        </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">₹ {price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQuantity}><AiOutlinePlus /></span>
            </p>
          </div>

          <div className="buttons">

           {isLoading ? <div className='redirecting'>Redirecting...</div> : 
             <>
            <button type="button" className="add-to-cart" onClick={onAdd}>Add to Cart</button>
            
            <button type="button" className="buy-now" onClick = {handleBuyCheckout}>Buy Now</button>
           
            </>
             
           }

          </div>
         
        </div>
      </div>

     


      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {product.map((item) => (
                <AllProduct key={item._id} products={item} />
              ))}
            </div>
          </div>
      </div>



      </div>
    
  )
}

export default ProductDetails