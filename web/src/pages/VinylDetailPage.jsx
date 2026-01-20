import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { IoIosLock, IoMdCart } from "react-icons/io";
import { MdAssignmentReturn } from "react-icons/md";
import { useParams } from "react-router";
const vinyl = {
  id: 2,
  image: "https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg",
  title: "Vinyl Dreams",
  price: "$24.99",
  genre: "Rock",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus dicta, consequatur assumenda amet omnis placeat debitis? Earum aspernatur ipsam porro? Vero, doloribus. Officiis est sapiente iste ipsum ut, consectetur id",
  inStock: 2,
  artist: {
    name: "Analog Soul",
    image: "https://picsum.photos/200/200",
    about:
      "Analog Soul is a renowned DJ and producer known for blending classic jazz and electronic vibes. Active since 2010, he has released multiple acclaimed albums and performed in festivals worldwide.",
  },
  tracks: [
    {
      id: 1,
      title: "Dreamscape",
      duration: "3:45",
    },
    {
      id: 2,
      title: "Night Groove",
      duration: "4:12",
    },
    {
      id: 3,
      title: "Analog Memories",
      duration: "5:03",
    },
    {
      id: 4,
      title: "Dream Escape",
      duration: "5:03",
    },
    {
      id: 5,
      title: "About You",
      duration: "5:03",
    },
    {
      id: 6,
      title: "Miss Dark",
      duration: "5:03",
    },
  ],
};

const VinylDetailPage = () => {
  const { id } = useParams();
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const handleChangeQuantity = (decrease = false) => {
    if (decrease) {
      if (quantityToAdd > 1) {
        setQuantityToAdd(quantityToAdd - 1);
      }
    } else {
      if (quantityToAdd < vinyl.inStock) {
        setQuantityToAdd(quantityToAdd + 1);
      }
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={5} className="d-flex justify-content-center">
          <div className="vinylImgWrapper">
            <img src={vinyl.image} alt={vinyl.title} />
          </div>
        </Col>

        <Col lg={7} className="d-flex flex-column gap-3">
          <span className="genereSpan">{vinyl.genre}</span>
          <h1 className="text-white">{vinyl.title}</h1>
          <h5 className="detailArtistName">{vinyl.artist.name}</h5>
          <div className="d-flex align-items-center">
            <span className="text-white fw-bold fs-4 ">{vinyl.price}</span>
            {vinyl.inStock > 0 ? (
              <span className="ms-2 inStock">In Stock</span>
            ) : (
              <span className="ms-2 outStock">Out of Stock</span>
            )}
          </div>
          <p className="text-secondary border-bottom  border-secondary pb-4">
            {vinyl.description}
          </p>
          <div className="d-flex flex-column">
            <div className="d-flex gap-3 align-items-center">
              <div className="d-flex align-items-center addQuantityContainer p-1 gap-2 text-white">
                <button
                  className="btnPlusMenp"
                  onClick={() => handleChangeQuantity(true)}
                >
                  -
                </button>
                {quantityToAdd}
                <button
                  className="btnPlusMenp"
                  onClick={() => handleChangeQuantity()}
                >
                  +
                </button>
              </div>

              <button className="btnAddCart d-flex align-items-center gap-2">
                <IoMdCart />
                Add to Cart
              </button>
              <span className="text-white">{vinyl.inStock} product remain</span>
            </div>
            <div className="row mt-4">
              <div className="col-6 d-flex align-items-center gap-2">
                <FaTruck className="iconColor" />
                <p className="m-0 text-secondary">Free shipping over $50</p>
              </div>

              <div className="col-6 d-flex align-items-center gap-2">
                <AiFillSafetyCertificate className="iconColor" />
                <p className="m-0 text-secondary">Certified product</p>
              </div>

              <div className="col-6 d-flex align-items-center gap-2 mt-3">
                <MdAssignmentReturn className="iconColor" />
                <p className="m-0 text-secondary">30 days return</p>
              </div>

              <div className="col-6 d-flex align-items-center gap-2 mt-3">
                <IoIosLock className="iconColor" />
                <p className="m-0 text-secondary">Secure checkout</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col lg={9}>
          <div className="d-flex align-items-center gap-3">
            <BsMusicNoteList className="iconColor" />
            <h3 className="m-0 text-white"> TrackList</h3>
          </div>
          <div className="containerTrack d-flex flex-column p-4 my-3 gap-3">
            {vinyl.tracks.map((track, index) => (
              <div
                key={track.id}
                className="d-flex justify-content-between align-items-center "
              >
                <div className="d-flex align-items-center gap-4">
                  <span className="text-secondary">{index + 1}.</span>
                  <span className="text-white">{track.title}</span>
                </div>
                <span className="text-secondary">{track.duration}</span>
              </div>
            ))}
          </div>
        </Col>
        <Col lg={3}>
          <div>
            <h3 className="m-0 text-white">About the Artist</h3>
          </div>
          <div className="containerAboutArtist d-flex flex-column p-4 my-3 gap-3">
            <div className="d-flex align-items-center gap-3">
              <img src={vinyl.artist.image} alt="" className="imgArtist" />
              <h5 className="text-white">{vinyl.artist.name}</h5>
            </div>
            <div>
              <p className="text-secondary">{vinyl.artist.about}</p>
            </div>
            <p className="btnViewFullDisco">View full discografy</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VinylDetailPage;
