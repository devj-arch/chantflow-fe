import React from 'react'
import './Home.css'
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import bellIcon from '../../assets/bell-icon.svg'
import calendarIcon from '../../assets/calendar-icon.svg'
import soundIcon from '../../assets/sound-icon.svg'
import SoundTrack from '../../components/SoundTrack/SoundTrack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
      <Hero />
      {/* <div className='sound-track'></div> */}
      <Link to='/chant'>
        <SoundTrack />
      </Link>
      <div className='home-activities'>
        <Card className='home-reminders' image={bellIcon} title={'Daily Reminders'} desc1={'Stay on track with'} desc2={'helpful notifications.'} />

        <Card className='home-progress' icon={<FontAwesomeIcon icon={faCalendarCheck} size="2xl" style={{color: "#ac8ead",}} />} title={'Progress Tracker'} desc1={'Monitor your chant'} desc2={'streaks and milestones.'} />

        <Card className='home-library' image={soundIcon} title={'Sacred Sounds Library'} desc1={'Explore mantras, hymns,'} desc2={'and spiritual music.'} />

      </div>
    </div>
  )
}

export default Home;
