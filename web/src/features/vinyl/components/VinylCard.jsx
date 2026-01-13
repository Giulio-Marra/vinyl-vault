import React from "react";

const VinylCard = ({ vinyl }) => {
  return (
    <div className="vinylCard">
      <img src={vinyl.image} alt={vinyl.title} className="imgVinylCard" />
      <h5>{vinyl.title}</h5>
      <p>{vinyl.artist}</p>
      <span>{vinyl.price}</span>
    </div>
  );
};

export default VinylCard;
