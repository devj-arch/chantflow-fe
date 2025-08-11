import React from 'react';
import MantraCard from '../MantraCard/MantraCard';
// import { useGetMantrasQuery } from '../../app/api';
import './MantraGrid.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function MantraGrid({mantras}) {

  return (
    <div className='mantra-grid'>
      {mantras.map((mantra) => (
        <MantraCard _id={mantra._id} key={mantra._id} mantra={mantra.name} description={mantra.description} />
      ))}
    </div>
  );
}
