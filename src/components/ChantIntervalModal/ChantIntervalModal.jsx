import React, { useState } from "react"
import '../ChantGoalModal/ChantGoalModal.css'

export default function ChantIntervalModal({ isOpen, onClose, onSubmit }) {
  const [timer, setTimer] = useState('')
  const [interval, setInterval] = useState('')

  const handleSubmit = () => {
    const data = {
      durationMinutes: Number(timer),        // Total chanting time
      bellIntervalMinutes: Number(interval)  // Bell interval
    }
    onSubmit(data)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Session Settings</h2>

        <div className="form-group">
          <label>Timer in Minutes</label>
          <input
            type="number"
            placeholder="Enter total chanting time"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Bell Interval in Minutes (optional)</label>
          <input
            type="number"
            placeholder="Enter bell interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className="ok-btn"
            onClick={handleSubmit}
            disabled={!timer} // Timer must be set, bell is optional
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
