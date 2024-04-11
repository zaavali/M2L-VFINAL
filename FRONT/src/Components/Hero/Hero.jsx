import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom';


import arrow_icon from '../Assets/arrow.png'



const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <div>
                <div className="hero-hand-icon">
                    <p>Bienvenue</p>
                 
                </div>
                <p>sur le site de</p>
                <p>La Maison des Ligues</p>
            </div>
            <div className="hero-latest-btn">
    <Link to="/badminton">
        <div>Voir nos produits</div>
        <img src={arrow_icon} alt="" />
    </Link>
</div>
        </div>

        <div className="hero-right">
          

        </div>
    </div>
  )
}

export default Hero