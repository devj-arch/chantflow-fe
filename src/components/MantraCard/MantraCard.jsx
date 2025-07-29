import React from 'react'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MantraCard.css'

export default function MantraCard({mantra, description, image}) {
  return (
    <div className='mantra-card-wrapper'>
      {/* <div className='mantra-image'>
        {image ? <img src={image} alt='mantra-image'></img> : ''}
      </div> */}
      <div className='card-left'>
        <h2>{mantra}</h2>
        <p>{description}</p>
      </div>
      <div className='card-right'>
        <FontAwesomeIcon icon={faAngleRight} size="2xl" style={{color: 'var(--color-text)',}} />
      </div>
    </div>
  )
}
