import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userdata',
  initialState: {

     token : localStorage.getItem('token'),
     profileName: localStorage.getItem('profileName'),
     userDetails: !!JSON.parse(localStorage.getItem('initialValue')) ? JSON.parse(localStorage.getItem('initialValue')) : "" ,
     IsUserLoggedin: !! localStorage.getItem('token')
       
  },
  reducers: {

    loginHandeler: (state, action ) => {
      
      state.token = action.payload;
       
      localStorage.setItem('token', action.payload);

      state.IsUserLoggedin = true;

    },
    
    updateProfileName: (state, action ) => {

      state.profileName = action.payload

      localStorage.setItem('profileName', action.payload );
    },

    logoutHandeler: (state) => {

     state.token = null ;
     state.userDetails = "" ;
     state.IsUserLoggedin = false ;
     localStorage.removeItem('token');
    localStorage.removeItem('profileName');
    localStorage.removeItem('initialValue');
    localStorage.removeItem('cartData');
    localStorage.removeItem('cartQunatity');
    localStorage.removeItem('totalPrice');

    },

    updateUserDetails: (state, action ) => {

      state.userDetails = action.payload ;

      localStorage.setItem('initialValue', JSON.stringify(action.payload));

    },

    


  },
})

// Action creators are generated for each case reducer function
export const { loginHandeler, logoutHandeler, updateProfileName, updateUserDetails  } = userData.actions

export default userData.reducer; 