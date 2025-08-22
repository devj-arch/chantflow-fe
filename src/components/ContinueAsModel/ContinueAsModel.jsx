import React from "react"
import { Link } from "react-router-dom"
import './ContinueAsModel.css'

export default function ContinueAsModal({isOpen, onClose}) {
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      <div className="modal-content">
        <h2>NOTE</h2>
        <p>Sign in to store your history and charts.</p>
        <div className="modal-actions">
          <button className="secondary-button guest-btn" onClick={onClose}>
            Continue as Guest
          </button>
          <Link to="/login" className="secondary-button login-btn">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
