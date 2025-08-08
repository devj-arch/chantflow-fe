import React, { useState } from 'react';
import './ChantGoalModal.css';

export default function ChantGoalModal({ isOpen, onClose, onSubmit }) {
  const [mode, setMode] = useState('count');
  const [chantCount, setChantCount] = useState('');
  const [chantTime, setChantTime] = useState('');

  const handleSubmit = () => {
    const data = mode === 'count'
      ? { type: 'count', value: Number(chantCount) }
      : { type: 'time', value: Number(chantTime) };

    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Your Chant Goal</h2>

        <div className="toggle-buttons">
          <button
            className={mode === 'count' ? 'active' : ''}
            onClick={() => setMode('count')}
          >
            🧮 Chant Count
          </button>
          <button
            className={mode === 'time' ? 'active' : ''}
            onClick={() => setMode('time')}
          >
            🕒 Duration
          </button>
        </div>

        <div className="form-group">
          <label>{mode === 'count' ? 'Number of Chants' : 'Time in Minutes'}</label>
          <input
            type="number"
            placeholder={mode === 'count' ? 'Enter chant count' : 'Enter duration in minutes'}
            value={mode === 'count' ? chantCount : chantTime}
            onChange={(e) =>
              mode === 'count'
                ? setChantCount(e.target.value)
                : setChantTime(e.target.value)
            }
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="ok-btn"
            onClick={handleSubmit}
            disabled={
              (mode === 'count' && !chantCount) ||
              (mode === 'time' && !chantTime)
            }
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
