import React from 'react'
import './Footer.css'
import logo_footer from '../Assets/logo_footer.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={logo_footer} alt="" className="logo-img" />
        <p>Maison des Ligues</p>
      </div>
      <ul className="footer-links">
        <li>Conditions d'utilisation</li>
        <li>Conditions générales de vente</li>
        <li>Mentions légales</li>
      </ul>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023 - Tous droits réservés.</p>
      </div>
    </div>
  )
}

export default Footer
