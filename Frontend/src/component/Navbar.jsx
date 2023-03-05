import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandeler } from '../State/userData';
import { updateShowCart, deleteCartItem } from '../State/productData';


const Navbar = () => {

 
  // let activeStyle = {
  //   textDecoration: "underline",
  // };  


 
const isLoggedin = useSelector(state => state.userdata.IsUserLoggedin ) ;

const showCart = useSelector(state=> state.productdata.showCart);

const cartQuantity = useSelector(state => state.productdata.cartQuantity);

const dispatch = useDispatch();

const navigate = useNavigate();



 const HandelCartClicked = () => {

   // ctx.setshowCart(true);

    dispatch(updateShowCart(true));

 }

 const handelLogout = () => {

   
   dispatch(logoutHandeler());

   dispatch(deleteCartItem());
   
   navigate('/');

 }


 


  return (
    
    <div className='navbar-container' >
     <Link to = "/">
     <p className='logo'>Magic Shop</p>
     </Link>
     <div >

    

     { isLoggedin && <NavLink to = '/UserLogin/profile' className='nav-account' > <FaUserAlt/> </NavLink> }
     

     { isLoggedin && <button className='nav-account' onClick={handelLogout} > Logout </button> }

     { !isLoggedin && <Link to = '/UserLogin/auth' className='nav-account' > Login </Link> }

     

     <button type='button' className='cart-icon' onClick={HandelCartClicked}>
      <AiOutlineShoppingCart />
      
      <span className='cart-item-qty'>{cartQuantity}</span>
     </button>

     {showCart && <Cart/>}

     
    </div>
    </div>
    
  )
}

export default Navbar
