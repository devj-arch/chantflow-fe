import React from 'react'
import MantraCard from '../MantraCard/MantraCard'
import mantras from '../../data/MantraList'
import './MantraGrid.css'

export default function MantraGrid() {
  return (
    <div className='mantra-grid'>
      {mantras.map((mantra) => (
        <MantraCard key={mantra._id} {...mantra} />
      ))}
    </div>
  )
}

