import React, { useState } from 'react'
import DeityGrid from '../../components/DeityGrid/DeityGrid'
import MantraGrid from '../../components/MantraGrid/MantraGrid'
import './Explore.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetDeitiesQuery, useGetMantrasQuery } from '../../app/api'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

export default function Explore() {
  const [selectedDeityId, setSelectedDeityId] = useState(null);
  const {data: deities, isLoading: loadingDeities, error: errorDeities} = useGetDeitiesQuery()
  const { data: mantras, isLoading: loadingMantras, error: errorMantras } = useGetMantrasQuery()

  if (loadingMantras || loadingDeities) return <LoadingScreen />
  if (errorMantras || errorDeities) return <p>Error loading data 😢</p>

  const filteredMantras = selectedDeityId
    ? mantras?.filter((m) => m.deityId._id === selectedDeityId)
    : mantras;

  const handleShowAllMantras = () => {
    setSelectedDeityId(null);
  };

  return (
    <>
    <div className='explore-gods'>
      <h2>Select a Deity</h2>
      <DeityGrid deities={deities} onSelectDeity={setSelectedDeityId}/>
      <button className='start-button primary-button'>Start Chanting</button>
      <button className='add-deity-button secondary-button'>{<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Deity</button>
    </div>
    <div className='explore-mantras'>
      <h2>Explore Mantras</h2>
      <p>Discover, search, and choose your mantra to chant.</p>
      <button className='add-mantra-button secondary-button'>{<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Mantra</button>
      <h2 onClick={handleShowAllMantras}>Popular Mantras</h2>
      <div className='popular-mantras mantra-list'>
        <MantraGrid mantras={filteredMantras}/>
      </div>
    </div>
    </>
  )
}
