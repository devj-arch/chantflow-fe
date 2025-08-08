import React from "react";
import "./Card.css";

const Card = ({ image, icon, title, desc1, desc2, onClick }) => {
  return (
    <div onClick={onClick}
      className={
        localStorage.getItem("theme") === "light" ? "card" : "card card-dark"
      }
    >
      {image ? <img src={image}></img> : icon}
      <h3>{title}</h3>
      <p>{desc1}</p>
      <p>{desc2}</p>
    </div>
  );
};

export default Card;
