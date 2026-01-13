import React from "react";
import { Badge, Col, Form, Row } from "react-bootstrap";
import { IoIosArrowDropdown } from "react-icons/io";
import VinylCard from "../features/vinyl/components/vinylCard";
const genres = [
  "Rock",
  "Classic Rock",
  "Jazz",
  "Blues",
  "Soul",
  "Funk",
  "Disco",
  "Hip Hop",
  "Electronic",
  "House",
  "Techno",
  "Ambient",
  "Classical",
  "Soundtracks",
  "Reggae",
  "Punk",
];
const vinylList = [
  {
    id: 1,
    image: "https://picsum.photos/800/600",
    title: "Retro Waves",
    artist: "DJ Vintage",
    price: "$29.99",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg",
    title: "Vinyl Dreams",
    artist: "Analog Soul",
    price: "$24.99",
  },
  {
    id: 3,
    image: "https://picsum.photos/700/600",
    title: "Groove Nights",
    artist: "The Turntables",
    price: "$27.50",
  },
  {
    id: 4,
    image: "https://picsum.photos/700/700",
    title: "Soulful Spins",
    artist: "Vinyl Collective",
    price: "$32.00",
  },
  {
    id: 5,
    image: "https://picsum.photos/900/600",
    title: "Soulful Spins",
    artist: "Vinyl Collective",
    price: "$32.00",
  },
];
const CatalogPage = () => {
  return (
    <div className="catalogPageContainer">
      <Row>
        <Col md={2} className="filterCatalogContainer">
          <div className="d-flex flex-column gap-2 pb-4">
            <h5>Broswe by</h5>
            <button className="btnFilterCatalogActive">All Records</button>
            <button className="btnFilterCatalog">New Arrivals</button>
            <button className="btnFilterCatalog">Sales</button>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <h5>Genre</h5>
              <IoIosArrowDropdown className="drpDwnIcon" />
            </div>
            <div className="menuItem d-flex flex-column">
              {genres.map((genre) => (
                <Form.Check label={genre} className="checkBox" />
              ))}
            </div>
          </div>
        </Col>
        <Col md={10}>
          <div className="d-flex gap-3 align-items-center">
            <h4 className="m-0">Records</h4>
            <p className="m-0">{vinylList.length} result</p>
          </div>
          <Row className="mt-4 g-4">
            {vinylList.map((vinyl) => (
              <Col key={vinyl.id} xs={12} sm={6} md={4} lg={3}>
                <VinylCard vinyl={vinyl} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CatalogPage;
