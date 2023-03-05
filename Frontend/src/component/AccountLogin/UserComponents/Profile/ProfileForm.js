import {  useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import { updatePassword } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';

const ProfileForm = () => {
 
  const enteredPasswordRef = useRef();
const [isLoading, setisLoading] =  useState(false);

  

  const submitHandeler = (event) => {

     event.preventDefault();

     const enteredPassword = enteredPasswordRef.current.value;

     const user = auth.currentUser;
     const newPassword = enteredPassword;
     
     updatePassword(user, newPassword).then(() => {
       
       alert("Password Updated")

     }).catch((error) => {
       
       alert(error);
       // ...
     });



    


  }



  
    






  return (
    
    <form className={classes.form} onSubmit={submitHandeler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={enteredPasswordRef} />
      </div>
      <div className={classes.action}>
       {!isLoading  && <button>Change Password</button> }
        
      </div>
    </form>
    
   
  );
}

export default ProfileForm;
