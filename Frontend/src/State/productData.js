import { createSlice } from '@reduxjs/toolkit'

export const productData = createSlice({
  name: 'productdata',
  initialState: {
    showCart : "",
    cartItem: !! JSON.parse(localStorage.getItem('cartData')) ? JSON.parse(localStorage.getItem('cartData')) : [],
    cartQuantity: !! JSON.parse(localStorage.getItem('cartQunatity')) ? JSON.parse(localStorage.getItem('cartQunatity')) : 0 ,
    totalPrice: !! JSON.parse(localStorage.getItem('totalPrice')) ? JSON.parse(localStorage.getItem('totalPrice')) : 0,

  },
  reducers: {

    updateShowCart: (state, action ) => {
      
      state.showCart = action.payload;
    },
    updateCartItem: (state, action ) => {

      state.cartItem = action.payload;

      localStorage.setItem('cartData', JSON.stringify(action.payload));

    },
     updateCartQunatity: (state, action) => {
      state.cartQuantity = action.payload;
      localStorage.setItem('cartQunatity', JSON.stringify(action.payload));

    },

    updateTotalPrice: (state, action ) => {

        state.totalPrice = action.payload ;
        localStorage.setItem('totalPrice', JSON.stringify(action.payload));

    } ,

    increaseCart : (state) => {

        state.cartQuantity += 1 ;

        localStorage.setItem('cartQunatity', state.cartQuantity);

    } ,

    decreaseCart : (state) => {

        state.cartQuantity -= 1 ;

        localStorage.setItem('cartQunatity', state.cartQuantity);

    } ,

    changePrice : (state, action) => {
       
        state.totalPrice += action.payload;
        
        localStorage.setItem('totalPrice', state.totalPrice);

    },

    addCart: (state, action ) => {

        state.cartQuantity += action.payload;

        localStorage.setItem('cartQunatity', state.cartQuantity)
    },
    
    addedProductOncart: (state, action) => {

      const product = action.payload.p ;

      const Pqty = action.payload.q;

      const checkProductIsPresent = state.cartItem.find(item => item._id === product._id);

      if(checkProductIsPresent)
      {
   
         checkProductIsPresent.productQty = checkProductIsPresent.productQty + Pqty;
   
         state.totalPrice  += checkProductIsPresent.price * Pqty ;

         localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));


   
         const UpdatedCartItem = state.cartItem.map(item => {
          
            if(item._id === product._id)
             {
               return checkProductIsPresent;
   
               }
   
              return item ;
               
             }
   
         );
   
   
   
         state.cartItem  = UpdatedCartItem ;
    
            
   
      }
   
   
      else
   
      {
          product.productQty = Pqty;

          state.cartItem.push(product);

          localStorage.setItem('cartData', JSON.stringify(state.cartItem));

          state.totalPrice +=  product.price * product.productQty
   
          localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
         
   
      }
   



    },

    deleteCartItem: (state) => {

      state.cartItem = []
      state.cartQuantity = 0; 
      state.totalPrice = 0 ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateCartItem, updateShowCart, updateCartQunatity,
             updateTotalPrice, increaseCart, decreaseCart, changePrice,
             addCart, addedProductOncart, deleteCartItem   } = productData.actions ;

export default productData.reducer ;