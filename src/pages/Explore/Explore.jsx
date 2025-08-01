import React from 'react'
import DeityGrid from '../../components/DeityGrid/DeityGrid'
import MantraGrid from '../../components/MantraGrid/MantraGrid'
import './Explore.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Explore() {
  return (
    <>
    <div className='explore-gods'>
      <h2>Select a Deity</h2>
      <DeityGrid />
      <button className='start-button primary-button'>Start Chanting</button>
      <button className='add-deity-button secondary-button'>{<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Deity</button>
    </div>
    <div className='explore-mantras'>
      <h2>Explore Mantras</h2>
      <p>Discover, search, and choose your mantra to chant.</p>
      <button className='add-mantra-button secondary-button'>{<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Mantra</button>
      <h2>Popular Mantras</h2>
      <div className='popular-mantras mantra-list'>
        <MantraGrid />
      </div>
    </div>
    </>
  )
}
