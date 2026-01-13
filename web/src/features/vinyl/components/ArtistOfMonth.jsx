import React from "react";

const ArtistOfMonth = () => {
  return (
    <div className="artistOfMonthContainer">
      <div className="aotmLeftSide">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBR7ekAvuo7uuOqFzP8jRBbcGH8YfMtElQSw&s"
          alt=""
        />
      </div>
      <div className="aotmRightSide">
        <h4>ARTIST OF THE MONTH</h4>
        <h2>Nome Artista</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa libero
          iste dolorem quas sunt facere aspernatur possimus perferendis
          molestiae repellat eum, aut numquam accusamus illum corporis! Soluta
          quaerat atque accusamus!
        </p>
        <button className="btnAofm">View all albums</button>
      </div>
    </div>
  );
};

export default ArtistOfMonth;
