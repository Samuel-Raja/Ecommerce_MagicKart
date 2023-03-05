import React, {  useRef } from 'react'
import { AiOutlineShopping, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {FiDelete} from 'react-icons/fi' ;
import { Link, useNavigate } from 'react-router-dom';
import urlFor from '../imageUrl';
//import toast from 'react-hot-toast';
import { createUserCart } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, changePrice, decreaseCart, increaseCart, updateCartItem, updateShowCart } from '../State/productData';




const Cart = () => {

 
  const isLoggedin = useSelector(state => state.userdata.IsUserLoggedin );

  const cartItem = useSelector(state => state.productdata.cartItem);

  const cartQuantity = useSelector(state => state.productdata.cartQuantity);

  const totalPrice = useSelector(state => state.productdata.totalPrice)

  const token = useSelector(state => state.userdata.token)

  const cartRef = useRef();
 
  const navigate = useNavigate();

  const dispatch = useDispatch();

 


  const HandelCartClicked = () => {


    dispatch(updateShowCart(false));

 }


 const handelPlus = (data) => {

  dispatch(increaseCart());


  const updatedCart =  cartItem.map(item => {

    if(data._id === item._id )
    {
       return {...item, productQty: item.productQty + 1 }
    }

    return item ;

  });



  dispatch(updateCartItem(updatedCart));


   dispatch(changePrice(data.price)) ;
   

   createUserCart(token, updatedCart);

 

 }




const handelMinus = (data) => {

 
  if(data.productQty === 1 )
  {
      
      return ;
  }

  else {

    

    dispatch(decreaseCart());

  const updatedCart =  cartItem.map(item => {

    if(data._id === item._id )
    {

       return {...item, productQty: item.productQty - 1 }
    }

    return item ;

  });



  dispatch(updateCartItem(updatedCart));

  dispatch(changePrice(-data.price))

  createUserCart(token, updatedCart);



  }

 }



 const handelRemoveItem = (data) => {

    const updatedCart = cartItem.filter(item => item._id !== data._id );

     dispatch(updateCartItem(updatedCart));


    dispatch(changePrice(-(data.price * data.productQty )));
     
    dispatch(addCart(-data.productQty));

    createUserCart(token, updatedCart );


 }







const handelCheckout = () => {

  isLoggedin ? navigate('/ShippingDetails', {state: cartItem } ) : navigate('/UserLogin/auth', {state: cartItem } )
 
   dispatch(updateShowCart(false));

}








  return (
    <div className="cart-wrapper" ref={cartRef}>
    <div className="cart-container">
      <button
      type="button"
      className="cart-heading"
      onClick={HandelCartClicked}>
        <AiOutlineLeft />
        <span className="heading">Your Cart</span>
        <span className="cart-num-items">({cartQuantity} items)</span>
      </button>

      {cartItem.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link to="/">
            <button
              type="button"
              onClick={HandelCartClicked}
              className="btn"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="product-container">
          {cartItem && cartItem.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" alt='Headphone_image' />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => handelMinus(item)}>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.productQty}</span>
                    <span className="plus" onClick={() => handelPlus(item)}><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => handelRemoveItem(item)}
                  >
                    <FiDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
         </div>

       {cartItem.length > 0 && (
        <div className='cart-bottom'>
          <div className='total'>
          <h3>Subtotal : </h3>
          <h3>{totalPrice}</h3>
          </div>
          <div className='btn-container'>

          
         <button  className='btn' onClick={handelCheckout} >Checkout</button>
          
           
            
          </div>
        </div>
       ) }

      </div>
      </div>
  )
}

export default Cart