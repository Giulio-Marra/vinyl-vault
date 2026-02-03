import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { FaTruck, FaArrowLeft } from "react-icons/fa";
import { IoIosLock, IoMdCart } from "react-icons/io";
import { MdAssignmentReturn } from "react-icons/md";

import { useParams, useNavigate } from "react-router";

import { getVinylById } from "../features/vinyl/services/apiVinylService";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/redux/cartThunks";

const VinylDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [vinyl, setVinyl] = useState({});
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  console.log(id);

  const user = useSelector((state) => state.auth.user);
  const cartLoading = useSelector((state) => state.cart.loading);

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

  const addVinylToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (vinyl.stock === 0) {
      return;
    }

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    dispatch(
      addToCart({
        id: id,
        quantity: quantityToAdd,
        token,
      }),
    );
  };

  useEffect(() => {
    const fetchVinylById = async (id) => {
      setIsLoading(true);
      try {
        const data = await getVinylById(id);
        setVinyl(data);
      } catch (error) {
        if (!error.status) {
          navigate("/error", {
            state: {
              statusCode: "Connection Error",
              message: "Cannot reach server. Please check your connection.",
            },
          });
        } else if (error.status >= 500) {
          navigate("/error", {
            state: {
              statusCode: error.status,
              message: "Server error. Please try again later.",
            },
          });
        } else if (error.status === 404) {
          navigate("/error", {
            state: {
              statusCode: 404,
              message: "Vinyl not found.",
            },
          });
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVinylById(id);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <ScaleLoader color="#169db9" height={20} width={3} />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Button
        variant="link"
        className="mb-3 p-0 d-flex align-items-center gap-2 text-decoration-none"
        onClick={() => navigate(-1)}
        style={{ color: "#169db9" }}
      >
        <FaArrowLeft /> Back
      </Button>
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
          <p className="text-secondary border-bottom border-secondary pb-4">
            {vinyl.description}
          </p>
          <div className="d-flex flex-column">
            <div className="d-flex gap-3 align-items-center">
              <div className="d-flex align-items-center addQuantityContainer p-1 gap-2 text-white">
                <button
                  className="btnPlusMenp"
                  onClick={() => handleChangeQuantity(true)}
                  disabled={!user || vinyl.stock === 0}
                >
                  -
                </button>
                {quantityToAdd}
                <button
                  className="btnPlusMenp"
                  onClick={() => handleChangeQuantity()}
                  disabled={!user || vinyl.stock === 0}
                >
                  +
                </button>
              </div>

              <button
                className="btnAddCart d-flex align-items-center gap-2"
                onClick={addVinylToCart}
                disabled={vinyl.stock === 0 || cartLoading}
              >
                <IoMdCart />
                {cartLoading
                  ? "Adding..."
                  : user
                    ? "Add to Cart"
                    : "Login for Buy"}
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
