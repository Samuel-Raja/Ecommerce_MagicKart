import React, { Fragment, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "./MetaData";
import "./ConfirmOrder.css";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import urlFor from "../../imageUrl";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import LoaderSpinner from "../LoaderSpinner";
import { useSelector } from "react-redux";



const ConfirmOrder = ({ history }) => {
  


  const ShippingInfo = useSelector(state => state.userdata.userDetails)

  const location = useLocation();

  const data = location.state;


  const [isLoading, setisLoading] = useState(false);

  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLICKEY ;

  const stripeTestPromise = loadStripe(PUBLIC_KEY)
 
  let sum = 0;

  data.forEach(element => {
     
      sum = sum + (element.productQty * element.price )

  });

  const subtotal = Number(sum) ;

  const shippingCharges = 0;

 const totalPrice = subtotal  + shippingCharges;

  
 const address = `${ShippingInfo.Address}, ${ShippingInfo.City}, ${ShippingInfo.State}, ${ShippingInfo.Pin}, India`;


  const proceedToPayment = async() => {
    

    setisLoading(true);

    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify(data),
      
      
    });

    if(response.statusCode === 500) return;

   
    
    const body = await response.json();

    

    setisLoading(false);

    window.location.href = body.url

    



  }



  return (
    <Fragment>
    { !isLoading && 
       <div>
      <MetaData title="Order Summery" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{ShippingInfo.Name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{ShippingInfo.Phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              { data &&
                  data.map((item) => (
                  <div key={item._id}>
                  <img src={urlFor(item?.image[0])} className="cart-product-image" alt='Headphone_image' />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.productQty} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.productQty}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
       
        <div>
          <div className="orderSummary">
            <Typography>Price Details</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

          <Elements stripe={stripeTestPromise}>
			
          <button type='btn' className='btn' onClick={proceedToPayment} >{isLoading ? 'Redirecting...' : 'Proceed To Payment'}</button>  
		     
         </Elements>

            
          </div>
        </div>
      </div>  
      </div>  }

     {isLoading && <LoaderSpinner/>}

    </Fragment>
  );
};

export default ConfirmOrder;
