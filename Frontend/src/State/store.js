import { configureStore } from '@reduxjs/toolkit'

import userDataReducer from './userData'

import productDataReducer from './productData'

export default configureStore({
  reducer: {
    userdata: userDataReducer,
    productdata: productDataReducer
  },
})