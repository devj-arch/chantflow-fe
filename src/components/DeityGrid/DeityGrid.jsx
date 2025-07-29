import React from 'react';
import DeityCard from '../DeityCard/DeityCard';
import deities from '../../data/DeityList'
import './DeityGrid.css'

function DeityGrid() {
  return (
    <div className="deity-grid">
      {deities.map((deity) => (
        <DeityCard key={deity._id} image={deity.image} name={deity.name}/>
      ))}
    </div>
  );
}

export default DeityGrid;
