import React from 'react'
import './Home.css'
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import bellIcon from '../../assets/bell-icon.svg'
import calendarIcon from '../../assets/calendar-icon.svg'
import soundIcon from '../../assets/sound-icon.svg'
import SoundTrack from '../../components/SoundTrack/SoundTrack';

function Home() {
  return (
    <div className='home'>
      <Hero />
      {/* <div className='sound-track'></div> */}
      <SoundTrack />
      <div className='home-activities'>
        <Card className='home-reminders' image={bellIcon} title={'Daily Reminders'} desc1={'Stay on track with'} desc2={'helpful notifications.'} />

        <Card className='home-progress' image={calendarIcon} title={'Progress Tracker'} desc1={'Monitor your chant'} desc2={'streaks and milestones.'} />

        <Card className='home-library' image={soundIcon} title={'Sacred Sounds Library'} desc1={'Explore mantras, hymns,'} desc2={'and spiritual music.'} />

      </div>
    </div>
  )
}

export default Home;
