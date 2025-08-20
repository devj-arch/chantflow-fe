import React from "react";

const getGuestChants = () => {
  const raw = localStorage.getItem('guestChants')
  return raw ? JSON.parse(raw) : {}
}

const saveGuestChants = (chants) => {
  localStorage.setItem('guestChants', JSON.stringify(chants) )
}

const incrementGuestChants = (mantraId, count = 1) => {
  const chants = getGuestChants()
  chants[mantraId] = (chants[mantraId] || 0) + count
  saveGuestChants(chants)
  return chants[mantraId]
}

const resetGuestChants = (mantraId) => {
  const chants = getGuestChants()
  delete chants[mantraId]
  saveGuestChants(chants)
  return 0
}

export {getGuestChants, saveGuestChants, incrementGuestChants, resetGuestChants}
