// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {  addDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY ,
  authDomain: "ecomv1-8524e.firebaseapp.com",
  projectId: "ecomv1-8524e",
  storageBucket: "ecomv1-8524e.appspot.com",
  messagingSenderId: "126126422437",
  appId: "1:126126422437:web:516d1bb3fb85e7ec3ed04c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//export const db = getFirestore(app);


export const createUserDocument = async (uid, obj  ) => {
  
  const {address, city, state, name, pinCode, phoneNo } = obj ;


const db = getDatabase();
set(ref(db, 'users/' + uid + '/UserDetails'), {
  
  Address : address,
  City: city,
  State: state,
  Name: name,
  Pin: pinCode,
  Phone: phoneNo


});



      }




 export const createUserName = async (uid, username  ) => {
  
       
      
      const db = getDatabase();
      set(ref(db, 'users/' + uid + '/UserProfile' ), {
        
        UserName: username
      
      
      });
      
      
      
   }    





   export const createUserCart = async (uid, usercart  ) => {
  
       
      
    const db = getDatabase();
    set(ref(db, 'users/' + uid + '/UserCart' ), {
      
      CartData: usercart
    
    
    });
    
    
    
 }    






    