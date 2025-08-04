import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import chantImg from '../../assets/chantImg.png'
// import beadsStatic from "../../assets/beads_shadow.png"
import beadsStatic from "../../assets/beads.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import './Chant.css'
import { faBell, faRepeat, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useGetMantrasQuery } from '../../app/api';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Chant() {
  const {mantraId} = useParams()
  const { data: mantras, isLoading } = useGetMantrasQuery()

  const mantra = mantras?.find(m => m._id === mantraId)

  if(isLoading) <LoadingScreen />
  if(!mantra) <p>Opps! 404 Mantra not found 🙁</p>

  const getStoredChants = () => {
    const raw = localStorage.getItem('chantCounts');
    return raw ? JSON.parse(raw) : {}
  }

  const [chantCounts, setChantCounts] = useState(getStoredChants())
  const currentCount = chantCounts[mantraId] || 0

  useEffect ( () => {
    // localStorage.setItem('chantCount', count);
    localStorage.setItem('chantCounts', JSON.stringify(chantCounts));
  }, [chantCounts]);

  const handleClick = () => {
    // const updated = {
    //   ...chantCounts,
    //   [mantraId] : currentCount + 1
    // }
    // setChantCounts(updated)
    // localStorage.setItem('chantCounts', JSON.stringify(updated))
    setChantCounts(prev => ({
      ...prev,
      [mantraId]: (prev[mantraId] || 0) + 1,
    }));
  }

  // const [count, setCount] = useState(localStorage.getItem('chantCount') === 'null' ? 0 : Number(localStorage.getItem('chantCount')));

  // const handleClick = () => {
  //   setCount(count + 1);
  // }



  const malaCount = Math.floor(currentCount / 108);

  const reset = () => {
    setChantCounts(prev => ({
      ...prev,
      [mantraId]: 0,
    }))
  }


  return (
    <div className="chant">
      <div className="chant-top">
        <div className="chant-image">
          <img src={chantImg} alt="chant-image"></img>
        </div>
        <h2>{mantra?.name}</h2>
        <div className="chant-counter">
          <div className="chant-progress">
            <button onClick={handleClick} className="chant-count">
              {/* {count} */}
              {currentCount}
            </button>
          </div>
          <div className='chant-reset'>
            <button onClick={reset} className="chant-reset-button">
              <FontAwesomeIcon icon={faRotateLeft} size="xl" style={{ color: "var(--color-player)" }} />
            </button>
          </div>
        </div>
        <div className="beads mala-container">
          <img src={beadsStatic} alt="beads" className="mala" />
          {malaCount >= 1 && <div className="mala-count">{malaCount}</div>}
        </div>
      </div>
      <div className="chant-features">
        <Card
          className="chant-timer"
          icon={
            <FontAwesomeIcon
              icon={faClock}
              size="xl"
              style={{ color: "var(--color-player)" }}
            />
          }
          title={"Timer"}
          desc1={"30 min"}
        />
        <Card
          className="chant-interval"
          icon={
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              style={{ color: "var(--color-player)" }}
            />
          }
          title={"Bell Interval"}
          desc1={"5 min"}
        />
        <Card
          className="chant-repeat"
          icon={
            <FontAwesomeIcon
              icon={faRepeat}
              size="xl"
              style={{ color: "var(--color-player)" }}
            />
          }
          title={"Auto Repeat"}
          desc1={"Repeat the chant"}
          desc2={"continuously."}
        />
      </div>
    </div>
  );
}
