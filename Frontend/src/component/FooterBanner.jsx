import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import urlFor from '../imageUrl';

const FooterBanner = ({footerBanner}) => {

  

const {discount, image, buttonText, largeText1, largeText2, smallText, midText, saleTime, desc, product } = footerBanner;



  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>

       <div className='left' >
         
         <h3>Flat </h3>
         <h3>40% OFF</h3>
         {/* <p>{saleTime}</p> */}
       </div>
       <div className='right'>
         <h3>End Of</h3>
         <h3>Seasons Sale</h3>
         {/* <p>Flat 40% OFF</p> */}
         <Link to = {`/product/${product}`}>
          <Button type='button'>{buttonText}</Button>
         </Link>
       </div>

       <img src= {image && urlFor(image).url()} alt = "Headphone" className='footer-banner-image' />

      </div>
    </div>
  )
}

export default FooterBanner