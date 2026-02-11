import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import VinylCard from "../features/vinyl/components/vinylCard";
import ArtistOfMonth from "../features/vinyl/components/ArtistOfMonth";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getLatestVinyls } from "../features/vinyl/services/apiVinylService";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestVinyls = async () => {
      setLoading(true);
      try {
        const data = await getLatestVinyls();
        setVinyls(data);
      } catch (err) {
        if (!err.status) {
          navigate("/error", {
            state: {
              statusCode: "Connection Error",
              message: "Cannot reach server. Please check your connection.",
            },
          });
        } else if (err.status >= 500) {
          navigate("/error", {
            state: {
              statusCode: err.status,
              message: "Server error. Please try again later.",
            },
          });
        } else {
          setError(err.message || "Failed to load records");
        }
        console.error("Error fetching latest vinyls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVinyls();
  }, [navigate]);

  return (
    <div className="homePageContainer">
      <Container>
        <div className="homePageImageContainer">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKNN_OiC_dD6gFCUrXKZPY-iBUlDvTWyTFWLVTLBfpgd6qGVcPH32voM3m5lfAfReh8oH_oFXEGDFc3BrOShU3abWWrplOCmz0v6k-JtbMA3qelR_1tMfMaVmar7fHPXGIzjdaGPSthG1YfyqpUNiyJOrG0ib7kKx6oLfRrxw-B7xfI_O9FmyDEeObOxOYeS9CtGMx8iI5_dpDwBxuL8rHYPbIyvWBLOkHlMVPWMe1OPT6f1vvhcBh0CxyfG4a1F8xBdOKNQtdEvTN"
            alt="image"
            className="imageHomePage"
          />
          <div className="imageFadeOverlay"></div>
          <div className="homePageTextBanner">
            <h1>
              Rediscover the <span>Analog Sound</span>
            </h1>
            <p>
              The best collection of vintage and modern vinyl, curated for the
              true audiophile. Free shipping on orders over $50.
            </p>
            <Button className="btnViewCollectionHomePage">
              View Collections
            </Button>
          </div>
        </div>

        <div className="homePageFeaturedRecords">
          <div className="homePageFeaturedRecordsTit">
            <h2>Featured Records</h2>
          </div>
          <div className="homePageVinylCardContainer">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center w-100 py-5">
                <ScaleLoader color="#169db9" height={20} width={3} />
              </div>
            ) : error ? (
              <p className="error">Error: {error}</p>
            ) : (
              vinyls.map((vinyl) => <VinylCard key={vinyl.id} vinyl={vinyl} />)
            )}
          </div>
        </div>
        <ArtistOfMonth />
        <div className="homePageJoinContainer">
          <IoMdMail className="emailIcon" />
          <div>
            <h2>Join the VinylVault Club</h2>
            <p className="mb-4">
              Get 10% off your first order, exclusive access to limited drops,
              and weekly curated playlists.
            </p>
          </div>
          <Form className="d-flex flex-column flex-md-row gap-2 w-100 justify-content-center">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              className="inptSubscribe"
            />
            <Button className="btnSubscribe">Subscribe</Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
