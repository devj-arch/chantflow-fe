import React, { useState, useEffect } from 'react';
import './InfoBox.css';
import Card from '../Card/Card';

export default function InfoBox() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenInfo = localStorage.getItem('seenChantInfo');
    if (!hasSeenInfo) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seenChantInfo', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='info-overlay'>
      <Card title='How to Chant' desc1='Tap the counter in the center to increase your chant count.' desc2='Tap to close' onClick={handleClose} />
    </div>
  )
}
