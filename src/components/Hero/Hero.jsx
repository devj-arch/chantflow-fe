import React from "react";
import './Hero.css'
import calmPerson from '../../assets/image-removebg-preview.png'
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      {/* <div className='hero-top'> */}
        <div className='hero-description'>
          <h1>Find Your Inner Rhythm</h1>
          <p>Chant daily, track your progress, and join a spiritual community</p>
          <Link to='/explore'>
          <button className='begin-button primary-button'>Begin Now</button>
          </Link>
        </div>
        <div className='hero-image'>
          <img src={calmPerson} alt='calm person'></img>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Hero;
