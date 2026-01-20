import React from "react";
import { Button, Row, Col } from "react-bootstrap";

const ArtistOfMonth = () => {
  return (
    <div className="artistOfMonthContainer">
      <Row className="g-0 align-items-center">
        <Col xs={12} md={6} className="aotmLeftSide">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBR7ekAvuo7uuOqFzP8jRBbcGH8YfMtElQSw&s"
            alt="Artist of the month"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col xs={12} md={6} className="aotmRightSide">
          <h4>ARTIST OF THE MONTH</h4>
          <h2>Nome Artista</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            libero iste dolorem quas sunt facere aspernatur possimus perferendis
            molestiae repellat eum, aut numquam accusamus illum corporis! Soluta
            quaerat atque accusamus!
          </p>
          <Button className="btnAofm">View all albums</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistOfMonth;
