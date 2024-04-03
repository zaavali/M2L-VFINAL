import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusivité</h1>
            <h1>Offres pour vous</h1>
            <p>SEULEMENT SUR LES BEST SELLERS</p>
            <button>Jettez-y un oeil</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />

        </div>
    </div>
  )
}

export default Offers