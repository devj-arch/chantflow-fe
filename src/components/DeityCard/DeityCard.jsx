import React from 'react'
import './DeityCard.css'

export default function DeityCard({ image, name, onClick }) {
  return (
    <div className='deity-card-wrapper' onClick={onClick}>
      <img src={image} alt='deity image'></img>
      <p className='card-name'>{name}</p>
    </div>
  )
}
