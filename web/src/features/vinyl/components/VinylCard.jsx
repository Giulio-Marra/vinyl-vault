import React from "react";
import { useNavigate } from "react-router";

const VinylCard = ({ vinyl }) => {
  const navigate = useNavigate();
  return (
    <div
      className="vinylCard"
      onClick={() => navigate(`/vinyl/detail/${vinyl.id}`)}
    >
      <div className="imgWrapper">
        <img src={vinyl.urlImage} alt={vinyl.title} className="imgVinylCard" />
        {vinyl.stock <= 0 && <span className="soldOutSpan">Sold Out</span>}
      </div>

      <h5>{vinyl.title}</h5>
      <p>{vinyl.artist.name}</p>
      <span>{vinyl.price}</span>
    </div>
  );
};

export default VinylCard;
