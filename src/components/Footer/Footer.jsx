import React from "react"
import './Footer.css'
import { Link } from "react-router-dom"
import ThemeToggle from "../ThemeToggle/ThemeToggle"

function Footer() {

  return (
    <footer className="footer">
      <div className="footer-section">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/terms">Terms</Link></li>
      </div>
      <div className="ambient-toggle">
        {/* Ambient Sound */}
        Change to
        <div className="toggle-button">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

export default Footer
