import React from "react";
import './Card.css'

const Card = ({image, title, desc1, desc2}) => {
  return (
    <div className={localStorage.getItem('theme')==='light' ? "card" : "card card-dark"}>
      <img src={image}></img>
      <h3>{title}</h3>
      <p>{desc1}</p>
      <p>{desc2}</p>
    </div>
  )
}

export default Card
