import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className='loading-spinner'>
      <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" style={{color: 'var(--color-player)',}} />
    </div>
  )
}
