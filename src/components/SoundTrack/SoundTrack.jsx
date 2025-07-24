import React from 'react'
import SoundTrackIcon from '../../assets/sound-track-icon.svg'
import './SoundTrack.css'
import triangle from '../../assets/Group 1.svg'

export default function SoundTrack() {
  return (
    <div className='sound-track'>
      <div className='sound-track-left'>
        <div className='sound-track-image'>
          <img src={SoundTrackIcon} alt='sound play icon' className='sound-play-icon'></img>
        </div>
      </div>
      <div className='sound-track-right'>
        <div className='sound-track-details'>
          <div className='track-title'><h2>Om Namah Shivaya</h2></div>
          <div className='sound-tracker'>
            <div className='progress-bar'></div>
          </div>
          <div className='sound-time'>
            <div className='played-time'>0:12</div>
            <div className='total-time'>5:00</div>
          </div>
        </div>
        {/* <div className='sound-player'> */}
          <button className='play-button'><img src={triangle} alt='play-triangle'></img></button>
        {/* </div> */}
      </div>
    </div>
  )
}
