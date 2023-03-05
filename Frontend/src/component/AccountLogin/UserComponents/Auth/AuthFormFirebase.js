import {  useRef, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth, createUserName } from '../../../../firebaseConfig';
import { getDatabase, ref, onValue } from "firebase/database";
import classes from './AuthForm.module.css';
import { loginHandeler, updateProfileName, updateUserDetails } from '../../../../State/userData';
import { updateCartItem, updateCartQunatity, updateTotalPrice } from '../../../../State/productData';
import { useDispatch } from 'react-redux';

const AuthFormFirebase = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  

  const dispatch = useDispatch();

  const location = useLocation();

  const LocationData = location.state;

  const navigate = useNavigate();

  

   const emailRef = useRef();
   const passwordRef = useRef();
   const nameRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

  };


  const submitHandeler =(event) => {

     event.preventDefault();

     const useremail = emailRef.current.value;

     const userpassword = passwordRef.current.value;
     

      console.log("check");


     if(isLogin)
     {
      signInWithEmailAndPassword(auth, useremail, userpassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(loginHandeler(user.uid));

        const db = getDatabase();
       const starCountRef = ref(db, `users/${user.uid}` );
     onValue(starCountRef, (snapshot) => {
     const data = snapshot.val(); 

     let totalCart = 0; 
     let totalcartPrice = 0 ;
     
    data.UserDetails && dispatch(updateUserDetails(data.UserDetails)); 

    data &&  dispatch(updateProfileName(data.UserProfile.UserName));


    data.UserCart  &&  dispatch(updateCartItem(data.UserCart.CartData));

   
     data.UserCart && data.UserCart.CartData.forEach(element => {
         
        totalCart = totalCart + element.productQty;

        totalcartPrice = totalcartPrice + (element.productQty * element.price);


      });

      

      data.UserCart.CartData &&   dispatch(updateTotalPrice(totalcartPrice));
     
      data.UserCart.CartData &&   dispatch(updateCartQunatity(totalCart));

     
        });



        setisLoading(false);

         !!LocationData ? navigate('/ShippingDetails', {state: LocationData} ) : navigate('/');

 
       
      })
      .catch((error) => {
       
        const errorMessage = error.message;
        setisLoading(false);
        alert(errorMessage);
        
      });
      
      
   
      
     }


     else 
     {

       
      setisLoading(true);

      const username = nameRef.current.value; 

     createUserWithEmailAndPassword(auth, useremail, userpassword)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    
    dispatch(loginHandeler(user.uid));
   
    
    dispatch(updateProfileName(username));

     
    createUserName(user.uid, username );

    setisLoading(false);

   !!LocationData ? navigate('/ShippingDetails', {state: LocationData} ) : navigate('/');

  
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    setisLoading(false);
    alert(errorMessage);
    // ..
  });

        

     }


    }


      
      

  


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandeler}>
     { !isLogin && <div className={classes.control}>
          <label htmlFor='name'>Your Name</label>
          <input type='name' id='name' ref={nameRef} required  />
        </div> }
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required  />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
        { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
           {isLoading && <h2>Submiting...</h2>}
            
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthFormFirebase;
