import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const HomePage = () => {
  return (
    <div className="homePageContainer">
      <div className="homePageImageContainer">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKNN_OiC_dD6gFCUrXKZPY-iBUlDvTWyTFWLVTLBfpgd6qGVcPH32voM3m5lfAfReh8oH_oFXEGDFc3BrOShU3abWWrplOCmz0v6k-JtbMA3qelR_1tMfMaVmar7fHPXGIzjdaGPSthG1YfyqpUNiyJOrG0ib7kKx6oLfRrxw-B7xfI_O9FmyDEeObOxOYeS9CtGMx8iI5_dpDwBxuL8rHYPbIyvWBLOkHlMVPWMe1OPT6f1vvhcBh0CxyfG4a1F8xBdOKNQtdEvTN"
          alt="image"
          className="imageHomePage"
        />
        <div className="imageFadeOverlay"></div>
        <div className="homePageTextBanner">
          <h1>
            Rediscover the <span> Analog Sound</span>
          </h1>
          <p>
            The best collection of vintage and modern vinyl, curated for the
            true audiophile. Free shipping on orders over $50.
          </p>

          <button className="btnViewCollectionHomePage">
            View Collections
          </button>
        </div>
      </div>
      <div className="genreMenu">
        <h2>Browse by Genre</h2>
        {genres.map((genre) => (
          <button className="btnGenre">{genre}</button>
        ))}
      </div>
      <div className="homePageFeaturedRecords">
        <div className="homePageFeaturedRecordsTit">
          <h2>Featured Records</h2>
          <div>
            <buton>
              <FaArrowLeft />
            </buton>
            <buton>
              <FaArrowRight />
            </buton>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
