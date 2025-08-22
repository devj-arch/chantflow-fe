import React, { useEffect, useState } from 'react'
import DeityGrid from '../../components/DeityGrid/DeityGrid'
import MantraGrid from '../../components/MantraGrid/MantraGrid'
import './Explore.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetDeitiesQuery, useGetMantrasQuery } from '../../app/api'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import ContinueAsModal from '../../components/ContinueAsModel/ContinueAsModel'

export default function Explore() {
  const [selectedDeityId, setSelectedDeityId] = useState(null);
  const {data: deities, isLoading: loadingDeities, error: errorDeities} = useGetDeitiesQuery()
  const { data: mantras, isLoading: loadingMantras, error: errorMantras } = useGetMantrasQuery()
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenContinueModal")

    if (!hasSeenModal) {
      setIsModalOpen(true) // show modal
      localStorage.setItem("hasSeenContinueModal", "true") // remember for next time
    }
  }, [])

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
      <ContinueAsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="explore-gods">
        <h2>Select a Deity</h2>
        <DeityGrid deities={deities} onSelectDeity={setSelectedDeityId} />
        {/* <button className='start-button primary-button'>Start Chanting</button> */}
        <button className="add-deity-button primary-button">
          {<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Deity
        </button>
      </div>
      <div className="explore-mantras">
        <h2>Explore Mantras</h2>
        <p>Discover, search, and choose your mantra to chant.</p>
        <button className="add-mantra-button primary-button">
          {<FontAwesomeIcon icon={faPlus} size="l" />} Add Your Mantra
        </button>
        <h2 onClick={handleShowAllMantras}>Popular Mantras</h2>
        <div className="popular-mantras mantra-list">
          <MantraGrid mantras={filteredMantras} />
        </div>
      </div>
    </>
  );
}
