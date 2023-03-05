import React from 'react'
import {ColorRing} from 'react-loader-spinner'

const LoaderSpinner = () => {
  return (
    <div className='loader-container' >
    <ColorRing
  visible={true}
//   height="500"
//   width="500"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="loader"
  wrapperClassName = "loader"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
</div>
  )
}

export default LoaderSpinner