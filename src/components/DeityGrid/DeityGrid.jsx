import React from 'react';
import DeityCard from '../DeityCard/DeityCard';
import deities from '../../data/DeityList'
import './DeityGrid.css'
import { useGetDeitiesQuery } from '../../app/api';

import shiv from '../../assets/shiv-image.png'
import lakshmi from '../../assets/lakshmi-image.png'
import ganpati from '../../assets/ganpati-image.png'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function DeityGrid() {
  const {data: deities, isLoading, error} = useGetDeitiesQuery()

  if (isLoading) return <LoadingScreen />
  if (error) return <p>Error loading mantras 😢</p>

  const imageMap = {
  'shiva.jpg': shiv,
  'maaLakshmi.jpg': lakshmi,
  'ganesha.jpg': ganpati,
};

  return (
    <div className="deity-grid">
      {deities && deities.map((deity) => {
        const imageSrc = imageMap[deity.image] || null;

        return(
        <DeityCard key={deity._id} name={deity.name} image={imageSrc} />
        )
      })}
    </div>
  );
}

export default DeityGrid;
