import React from 'react'
import { Link } from 'react-router-dom'
import urlFor from '../imageUrl';



const HeroBanner = ({heroBanner}) => {

  

  return (
    <div className='hero-banner-container'>
        <div>
           <h3>Smart Watches</h3>
            {/* <p className='beats-solo'>{heroBanner.smallText}</p> */}
            <h1>Sale</h1>
            
            { heroBanner.image  &&  <img src = {urlFor(heroBanner.image).url()} alt ="Headphones" className='hero-banner-image' />
            }

           

            <div>
                <Link to = {`/product/${heroBanner.product}`}>
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link>

            </div>

            <div className='desc'>
            
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>

            </div>
        </div>
    </div>
  )
}

export default HeroBanner