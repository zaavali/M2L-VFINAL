import React from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
// import Item from '../Item/Item'

import Prodbddshow from '../../Pages/prodbddshow'

const Popular = () => {
  return (
  
    
    <div className='popular'>
       
      
        {/* <div className="popular-item">
            {data_product.map((item, i) => (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          
        </div> */}
        <div className="popular-item">
        <Prodbddshow></Prodbddshow>
        </div>
       
    </div>
  )
}

export default Popular
