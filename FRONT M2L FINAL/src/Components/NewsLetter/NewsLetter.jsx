import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Recevez Des Offres Exclusives</h1>
      <p>Abonnez-vous à notre newsletter et restez informé</p>
      <div>
        <input type="email" placeholder='Entrez votre adresse mail' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
