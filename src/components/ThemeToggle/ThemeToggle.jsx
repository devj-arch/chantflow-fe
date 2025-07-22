import React, { useEffect, useState } from "react";

import "./ThemeToggle.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState( () => {
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  })

  useEffect( () => {
    if(darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  })

  const handleToggle = () => {
    setDarkMode(!darkMode);
  }
  // TODO: fix button styling
  return (
    <button className="theme-toggle" onClick={handleToggle}>{darkMode ? '☀️' : '🌑' }</button>
  )
}

export default ThemeToggle
