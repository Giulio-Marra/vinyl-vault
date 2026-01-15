import React, { useState } from "react";
import { Badge, Col, Form, Row } from "react-bootstrap";
import { IoIosArrowDropdown, IoIosArrowDropleft } from "react-icons/io";
import VinylCard from "../features/vinyl/components/vinylCard";
import { useSearchParams } from "react-router";
import { Slider } from "@mui/material";
const genres = [
  "All",
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
  const [modalGenre, setModalGenre] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [valuePrice, setValuePrice] = useState([0, 1000]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const handleChangePriceValue = (e, newValue = []) => {
    setValuePrice(newValue);
  };
  function valuetext(valuePrice) {
    return `${valuePrice}°C`;
  }

  return (
    <>
      <div className="heroSection d-flex flex-column justify-content-center align-items-center text-center mt-4 heroSectionCatalog">
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Discover Vinyl Collections
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Find the perfect record for your collection
        </p>
      </div>

      <div className="catalogPageContainer">
        <Row>
          <Col md={2} className="filterCatalogContainer">
            <div className="d-flex flex-column gap-2 pb-4 border-bottom border-secondary">
              <h5>Broswe by</h5>
              <button className="btnFilterCatalogActive">All Records</button>
              <button className="btnFilterCatalog">New Arrivals</button>
              <button className="btnFilterCatalog">Sales</button>
            </div>
            <div className="d-flex flex-column border-bottom border-secondary py-4">
              <div className="d-flex align-items-center justify-content-between">
                <h5>Genre</h5>
                {modalGenre ? (
                  <IoIosArrowDropdown
                    className="drpDwnIcon"
                    onClick={() => setModalGenre((prev) => !prev)}
                  />
                ) : (
                  <IoIosArrowDropleft
                    className="drpDwnIcon"
                    onClick={() => setModalGenre((prev) => !prev)}
                  />
                )}
              </div>
              {modalGenre && (
                <div className="menuItem d-flex flex-column">
                  {genres.map((g) => (
                    <Form.Check
                      key={g}
                      type="radio"
                      name="genre"
                      label={g}
                      value={g}
                      className="checkBox"
                      checked={selectedGenre === g}
                      onChange={() => setSelectedGenre(g)}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="py-4 d-flex gap-3">
              <Form.Check label="In Stock" className="checkBox" />
              <Form.Check label="All Records" className="checkBox" />
            </div>
            <div className="">
              <h5>Price Range</h5>
              <Slider
                getAriaLabel={() => "Price range"}
                value={valuePrice}
                onChange={handleChangePriceValue}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
                min={0}
                max={1000}
                sx={{
                  color: "#169db9",
                }}
              />
              <div className="d-flex justify-content-between text-secondary">
                <p>{valuePrice[0]} £</p>
                <p>{valuePrice[1]} £</p>
              </div>
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex gap-3 align-items-center">
              <h4 className="m-0 text-white ">Records</h4>
              <p className="m-0 text-secondary">({vinylList.length} result)</p>
            </div>
            <Row className="mt-4 g-4">
              {vinylList.map((vinyl) => (
                <Col key={vinyl.id} xs={12} sm={6} md={4} lg={3}>
                  <VinylCard vinyl={vinyl} />
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <button
                disabled={!hasMore}
                className="btnLoadMore mt-3 px-4 py-2"
              >
                Load More Records
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CatalogPage;
