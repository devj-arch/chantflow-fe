import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
// import chantImg from '../../assets/chantImg.png';
import beadsStatic from '../../assets/beads.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell, faRepeat, faRotateLeft, faInfo } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useGetChantStatsQuery, useGetMantrasQuery, useGetProfileQuery, useLogChantMutation } from '../../app/api';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ChantGoalModal from '../../components/ChantGoalModal/ChantGoalModal';
import ChantIntervalModal from '../../components/ChantIntervalModal/ChantIntervalModal';
import bell from '../../sounds/mixkit-bike-notification-bell-590.mp3'
import './Chant.css';
import { toast } from 'react-toastify';
import InfoBox from '../../components/InfoBox/InfoBox';
import { Tooltip } from 'react-tooltip';
import imageMap from '../../data/DeityList';

import {getGuestChants, incrementGuestChants, resetGuestChants} from '../../utils/chantStorage'

export default function Chant() {
  const { mantraId } = useParams();
  const {data: user, isLoading: loadingUser, error: errorLoading, refetch: refetchUserProfile} = useGetProfileQuery()
  const { data: mantras, isLoading } = useGetMantrasQuery();
  const [lastChantTime, setLastChantTime] = useState(0);
  const [autoRepeatModalOpen, setAutoRepeatModalOpen] = useState(false);
  const [sessionSettingsModalOpen, setSessionSettingsModalOpen] = useState(false);
  // const [chantSettings, setChantSettings] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const {data: chantStats, isLoading: loadingChants, refetch: refetchChantStat} = useGetChantStatsQuery(
    { userId: user?._id, mantraId },
    { skip: !user || !mantraId } // avoid fetching before user is loaded
  )
  /*
  //Local Storage
  const [chantCounts, setChantCounts] = useState(() => {
    const raw = localStorage.getItem('chantCounts');
    return raw ? JSON.parse(raw) : {};
  });
  const currentCount = chantCounts[mantraId] || 0;
  useEffect(() => {
    localStorage.setItem('chantCounts', JSON.stringify(chantCounts));
  }, [chantCounts, mantraId]);
  */

  const [logChant] = useLogChantMutation()
  // const currentCount = chantStats?.count || 0
  const [localCount, setLocalCount] = useState(0)
  const guestChants = getGuestChants()

  useEffect(() => {
    if(!user?._id) {
      setLocalCount(guestChants[mantraId] || 0)
    } else if (chantStats?.count !== undefined) {
      setLocalCount(chantStats.count);
    }
  }, [chantStats]);

  const mantra = mantras?.find(m => m._id === mantraId);


  /* LocalStorage
  setChantCounts((prev) => ({
    ...prev,
    [mantraId]: (prev[mantraId] || 0) + 1
  }))
  setLastChantTime(now)
  */
  const handleClick = async () => {
    if (!mantraId) return;
    const today = new Date().toISOString().split("T")[0];
    const now = Date.now()
    const minInterval = 1000

    if (now - lastChantTime <= minInterval) {
      console.log("You are chanting too fast!");
      return;
    }

    // Optimistically update UI
    setLocalCount((prev) => prev + 1);
    setLastChantTime(now);

    // Persist in backend
    try {
      if (user?._id ) {
        await logChant({
          userId: user._id,
          mantraId,
          date: today,
          count: 1,
        });
        // Confirm with DB
        // refetchChantStat();
      } else {
        const guestCount = incrementGuestChants(mantraId, 1)
        setLocalCount(guestCount)
      }
    } catch (err) {
      console.error("Failed to log chant", err);
      // rollback UI if failed
      setLocalCount((prev) => prev - 1);
    }
  };


  const startAutoChant = (settings) => {
    const interval = 2000;
    const today = new Date().toISOString().split("T")[0];

    if (settings.type === "count") {
      let count = 0;
      const chantIntervalId = setInterval(() => {
        setLocalCount((prev) => prev + 1);
        count++;
        if (count >= settings.value) clearInterval(chantIntervalId);

        if (user?._id) {
          logChant({
            userId: user._id,
            mantraId,
            date: today,
            count,
          });
        } else {
          const newCount = incrementGuestChants(mantraId, 1)
          setLocalCount(newCount)
        }
      }, interval);
    }

    if (settings.type === "time") {
      const duration = settings.value * 60 * 1000;
      const endTime = Date.now() + duration;
      let count = 0;

      const chantIntervalId = setInterval(() => {
        setLocalCount((prev) => prev + 1);
        count++;
        if (endTime - Date.now() <= 0) clearInterval(chantIntervalId);
        if (user?._id) {
          logChant({
            userId: user._id,
            mantraId,
            date: today,
            count,
          });
        } else {
          const newCount = incrementGuestChants(mantraId, 1)
          setLocalCount(newCount)
        }
      }, interval);
    }
  };

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
    setLocalCount(0)
    if(!user?._id) {
      resetGuestChants(mantraId)
    }
  };

  const malaCount = Math.floor(localCount / 108);

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
              {localCount}
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
