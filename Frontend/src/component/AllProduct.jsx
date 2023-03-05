import React from 'react'
import { Link } from 'react-router-dom'
import urlFor from '../imageUrl';

const AllProduct = ({products}) => {

    const  {image, slug, details, name, price} = products ; 
  return (
    
   
    <div >
        <Link to = {`/product/${slug.current}`}  >
        
        <div className='product-card'>
          <img src={image && urlFor(image[0]).url() } alt = "Headphone"
             width={250} height={250} className= 'product-image' />

           <p className='product-name'>{name}</p> 
           <p className='product-price'>Rs.{price}</p> 

        </div>
        
      </Link>
    </div>
   

  
  )
}

export default AllProduct