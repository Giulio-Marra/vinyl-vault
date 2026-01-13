import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import VinylCard from "../features/vinyl/components/vinylCard";
import ArtistOfMonth from "../features/vinyl/components/ArtistOfMonth";

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
        <div className="homePageVinylCardContainer">
          {vinylList.map((vinyl) => (
            <VinylCard key={vinyl.id} vinyl={vinyl} />
          ))}
        </div>
      </div>
      <ArtistOfMonth />
      <div className="homePageJoinContainer">
        <IoMdMail className="emailIcon" />
        <div>
          <h2>Join the VinylVault Club</h2>
          <p>
            Get 10% off your first order, exclusive access to limited drops, and
            weekly curated playlists.
          </p>
        </div>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            className="inptSubscribe"
          />
          <button className="btnSubscribe">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
