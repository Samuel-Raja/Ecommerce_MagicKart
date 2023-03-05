import React from 'react'

const Category = (props) => {
  return (
    <div className="category-container" >
      
      <h1>{props.children}</h1>

    </div>
  )
}

export default Category