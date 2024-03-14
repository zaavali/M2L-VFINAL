import React from 'react'
import './Hero.css'

import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'
import fond_accueil from '../Assets/fond_accueil.png'


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
                <div>Voir nos produits</div>
                <img src={arrow_icon} alt="" />
           </div>
        </div>

        <div className="hero-right">
          

        </div>
    </div>
  )
}

export default Hero