import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { IoIosLock, IoMdCart } from "react-icons/io";
import { MdAssignmentReturn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addProduct } from "../features/cart/redux/cartSlice";
import { getVinylById } from "../features/vinyl/services/apiVinylService";
import { ScaleLoader } from "react-spinners";

const VinylDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [vinyl, setVinyl] = useState({});
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const vinylToAdd = { ...vinyl, quantity: quantityToAdd };
    dispatch(addProduct(vinylToAdd));
  };

  const handleChangeQuantity = (decrease = false) => {
    if (decrease) {
      if (quantityToAdd > 1) {
        setQuantityToAdd(quantityToAdd - 1);
      }
    } else {
      if (quantityToAdd < vinyl.stock) {
        setQuantityToAdd(quantityToAdd + 1);
      }
    }
  };

  console.log(vinyl);
  console.log(id);

  useEffect(() => {
    const fetchVinylById = async (id) => {
      setIsLoading(true);
      try {
        const data = await getVinylById(id);
        setVinyl(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVinylById(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <ScaleLoader color="#169db9" height={20} width={3} />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col lg={5} className="d-flex justify-content-center">
          <div className="vinylImgWrapper">
            <img src={vinyl.urlImage} alt={vinyl.title} />
          </div>
        </Col>

        <Col lg={7} className="d-flex flex-column gap-3">
          <div className="d-flex gap-2 flex-wrap">
            {vinyl.genreList &&
              vinyl.genreList.map((genre) => (
                <span key={genre.id} className="genereSpan">
                  {genre.name}
                </span>
              ))}
          </div>
          <h1 className="text-white">{vinyl.title}</h1>
          <h5 className="detailArtistName">{vinyl.artist?.name}</h5>
          <div className="d-flex align-items-center">
            <span className="text-white fw-bold fs-4 ">£{vinyl.price}</span>
            {vinyl.stock > 0 ? (
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

              <button
                className="btnAddCart d-flex align-items-center gap-2"
                onClick={handleAddToCart}
              >
                <IoMdCart />
                Add to Cart
              </button>
              <span className="text-white">{vinyl.stock} product remain</span>
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
            {vinyl.tracks && vinyl.tracks.length > 0 ? (
              vinyl.tracks.map((track) => (
                <div
                  key={track.id}
                  className="d-flex justify-content-between align-items-center "
                >
                  <div className="d-flex align-items-center gap-4">
                    <span className="text-secondary">
                      Side {track.side} - {track.trackNumber}.
                    </span>
                    <span className="text-white">{track.title}</span>
                  </div>
                  <span className="text-secondary">{track.duration}</span>
                </div>
              ))
            ) : (
              <p className="text-secondary">No tracks available</p>
            )}
          </div>
        </Col>
        <Col lg={3}>
          <div>
            <h3 className="m-0 text-white">About the Artist</h3>
          </div>
          <div className="containerAboutArtist d-flex flex-column p-4 my-3 gap-3">
            <div className="d-flex align-items-center gap-3">
              <img
                src={vinyl.artist?.urlImage}
                alt={vinyl.artist?.name}
                className="imgArtist"
              />
              <h5 className="text-white">{vinyl.artist?.name}</h5>
            </div>
            <div>
              <p className="text-secondary">{vinyl.artist?.about}</p>
            </div>
            <p className="btnViewFullDisco">View full discografy</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VinylDetailPage;
