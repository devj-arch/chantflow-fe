import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import chantImg from '../../assets/chantImg.png';
import beadsStatic from '../../assets/beads.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faRepeat, faRotateLeft, faInfo } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useGetMantrasQuery } from '../../app/api';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ChantGoalModal from '../../components/ChantGoalModal/ChantGoalModal';
import ChantIntervalModal from '../../components/ChantIntervalModal/ChantIntervalModal';
import bell from '../../sounds/mixkit-bike-notification-bell-590.mp3'
import './Chant.css';
import { toast } from 'react-toastify';
import InfoBox from '../../components/InfoBox/InfoBox';
import { Tooltip } from 'react-tooltip';
import imageMap from '../../data/DeityList';

export default function Chant() {
  const { mantraId } = useParams();
  const { data: mantras, isLoading } = useGetMantrasQuery();
  const [lastChantTime, setLastChantTime] = useState(0);
  const [autoRepeatModalOpen, setAutoRepeatModalOpen] = useState(false);
  const [sessionSettingsModalOpen, setSessionSettingsModalOpen] = useState(false);
  // const [chantSettings, setChantSettings] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [chantCounts, setChantCounts] = useState(() => {
    const raw = localStorage.getItem('chantCounts');
    return raw ? JSON.parse(raw) : {};
  });

  const mantra = mantras?.find(m => m._id === mantraId);
  console.log('mantra: ', mantra);
  const currentCount = chantCounts[mantraId] || 0;

  useEffect(() => {
    localStorage.setItem('chantCounts', JSON.stringify(chantCounts));
  }, [chantCounts, mantraId]);

  const handleClick = () => {
    const now = Date.now()
    const minInterval = 1000
    if (now - lastChantTime <= minInterval) {console.log('You are chanting too fast!')}
    else {
      setChantCounts((prev) => ({
        ...prev,
        [mantraId]: (prev[mantraId] || 0) + 1
      }))
      setLastChantTime(now)
    }
  }

  const startAutoChant = (settings) => {
    const interval = 2000

    if(settings.type === 'count') {
      let count = 0
      const chantIntervalId = setInterval(() => {
        setChantCounts(prev =>( {
          ...prev,
          [mantraId]: (prev[mantraId] || 0) + 1,
        }))
        count++
        if(count >= settings.value) clearInterval(chantIntervalId)

      }, interval);
    }

    if(settings.type === 'time') {
      const duration = settings.value * 60 * 1000
      const endTime = Date.now() + duration

      const chantIntervalId = setInterval(() => {
        setChantCounts(prev =>( {
          ...prev,
          [mantraId]: (prev[mantraId] || 0) + 1,
        }))
        if(endTime - Date.now() <= 0) clearInterval(chantIntervalId)

      }, interval);
    }

  }

  const startSession = (durationMinutes, bellIntervalMinutes) => {
    const endTime = Date.now() + durationMinutes * 60 * 1000
    let durationId, bellId
    if(durationMinutes) {
        durationId = setInterval(() => {
        if(Date.now() >= endTime) {
          toast.success("Session complete!")
          clearInterval(durationId)
          if(bellId) clearInterval(bellId)
        }
      }, 1000);
    }
    if(bellIntervalMinutes) {
      bellId = setInterval(() => {
        if(Date.now() >= endTime) {
          clearInterval(bellId)
        } else {
          console.log('🔔 Bell sound!')
          toast.info('🔔 Bell rang!')
          playBell()
        }
      }, bellIntervalMinutes * 60 * 1000);
    }
  }

  const playBell = () => {
    const audio = new Audio(bell)
    audio.play()
  }


  const handleChantStart = (settings) => {
    console.log('settings: ', settings);
    console.log('settings.type: ', settings.type);
    console.log('settings.value: ', settings.value);
    setCountdown(5)

    const countdownId = setInterval( () => {
      setCountdown( prev => {
        if(prev <= 1) {
          clearInterval(countdownId)
          console.log('countdown is over.')
          startAutoChant(settings)
          return null
        } else {
          console.log('Countdown: ', prev - 1);
          return prev - 1;
        }
      })
    }, 1000);
  }

  const handleSessionStart = ({ durationMinutes, bellIntervalMinutes }) => {
    console.log('Timer:', durationMinutes, 'minutes');
    console.log('Bell Interval:', bellIntervalMinutes, 'minutes');

    startSession(durationMinutes, bellIntervalMinutes);
  }


  const reset = () => {
    setChantCounts(prev => ({
      ...prev,
      [mantraId]: 0,
    }));
  };

  const malaCount = Math.floor(currentCount / 108);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!mantra) {
    return <p>Oops! 404 Mantra not found 🙁</p>;
  }

  return (
    <div className="chant">
      <InfoBox />
      <div className="chant-top">
        <div className="chant-image">
          <img src={imageMap[mantra?.deityId?.image] || null} alt="chant-image" />
        </div>
        <h2>{mantra.name}</h2>
        <div className="chant-counter">
          <div className="chant-progress">
            <button onClick={handleClick} className="chant-count">
              {currentCount}
            </button>
          </div>
          <div className="chant-reset">
            <button onClick={reset} className="chant-reset-button">
              <FontAwesomeIcon
                icon={faRotateLeft}
                size="xl"
                style={{ color: "var(--color-player)" }}
              />
            </button>
          </div>
          <div className="chant-info">
            <button
              className="chant-info-button"
              data-tooltip-id="chantTip"
              data-tooltip-content="Tap the counter to increase chant count ↑"
            >
              <FontAwesomeIcon
                icon={faInfo}
                size="xl"
                style={{ color: "var(--color-player)" }}
              />
            </button>
            <Tooltip id="chantTip" place="bottom" style={{ backgroundColor: 'var(--color-secondary)', color: '#fff', borderRadius: '8px', padding: '6px 10px' }} />
          </div>
        </div>
        <div className="beads mala-container">
          <img src={beadsStatic} alt="beads" className="mala" />
          {malaCount >= 1 && <div className="mala-count">{malaCount}</div>}
        </div>
      </div>
      {countdown !== null && (
        <div className="countdown-overlay">
          <h2>Starting in {countdown}...</h2>
        </div>
      )}
      <div className="chant-features">
        <Card
          onClick={() => setSessionSettingsModalOpen(true)}
          className="chant-timer"
          icon={
            <FontAwesomeIcon
              icon={faClock}
              size="xl"
              style={{ color: "var(--color-player)" }}
            />
          }
          title="Session Settings"
          desc1="Timer"
          desc2="Bell Interval"
        />
        {/* <Card
          className="chant-interval"
          icon={<FontAwesomeIcon icon={faBell} size="xl" style={{ color: "var(--color-player)" }} />}
          title="Bell Interval"
          desc1="5 min"
        /> */}
        <Card
          onClick={() => setAutoRepeatModalOpen(true)}
          className="chant-repeat"
          icon={
            <FontAwesomeIcon
              icon={faRepeat}
              size="xl"
              style={{ color: "var(--color-player)" }}
            />
          }
          title="Auto Repeat"
          desc1="Repeat the chant"
          desc2="continuously."
        />
      </div>
      <ChantGoalModal
        isOpen={autoRepeatModalOpen}
        onClose={() => setAutoRepeatModalOpen(false)}
        onSubmit={handleChantStart}
      />
      <ChantIntervalModal
        isOpen={sessionSettingsModalOpen}
        onClose={() => setSessionSettingsModalOpen(false)}
        onSubmit={handleSessionStart}
      />
    </div>
  );
}
