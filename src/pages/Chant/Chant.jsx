import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import chantImg from '../../assets/chantImg.png'
// import beadsStatic from "../../assets/beads_shadow.png"
import beadsStatic from "../../assets/beads.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import './Chant.css'
import { faBell, faRepeat } from '@fortawesome/free-solid-svg-icons';

export default function Chant() {
  const [count, setCount] = useState(localStorage.getItem('chantCount') === 'null' ? Number(0) : localStorage.getItem('chantCount'));
  const handleClick = () => {
    setCount(Number(count) + 1);
  }

  useEffect ( () => {
    localStorage.setItem('chantCount', count);
  })

  return (
    <div className='chant'>
      <div className='chant-top'>
        <div className='chant-image'>
          <img src={chantImg} alt='chant-image'></img>
        </div>
        <h2>Om Namah Shivaya</h2>
        <div className='chant-counter'>
          <div className='chant-progress'>
            <button onClick={handleClick} className='chant-count'>
              {count}
            </button>
          </div>
        </div>
        <div className='beads mala-container'>
          <img src={beadsStatic} alt='beads' className='mala' ></img>
        </div>
      </div>
      <div className='chant-features'>
      <Card className='chant-timer' icon={<FontAwesomeIcon icon={faClock} size="xl" style={{color: 'var(--color-player)',}} />} title={'Timer'} desc1={'30 min'} />
      <Card className='chant-interval' icon={<FontAwesomeIcon icon={faBell} size="xl" style={{color: 'var(--color-player)',}} />} title={'Bell Interval'} desc1={'5 min'} />
      <Card className='chant-repeat' icon={<FontAwesomeIcon icon={faRepeat} size="xl" style={{color: 'var(--color-player)',}} />} title={'Auto Repeat'} desc1={'Repeat the chant'} desc2={'continuously.'} />
      </div>
    </div>
  )
}
