import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import {
  getGenresForMovies,
  getGenresForTvShows,
  getMovies,
  getTvShows,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.config";
import Slider from "../components/Slider";
export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const moviesGenres = useSelector((state) => state.netflix.moviesGenres);

  const tvShows = useSelector((state) => state.netflix.tvShows);
  const tvShowsGenres = useSelector((state) => state.netflix.tvShowsGenres);

  useEffect(() => {
    dispatch(getGenresForMovies());
    dispatch(getGenresForTvShows());
    dispatch(getMovies());
    dispatch(getTvShows());
  }, [dispatch]);
  const toggleSocials = () => {
    setShowSocials(!showSocials);
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />{" "}
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="movie-logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate("/player")}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center" onClick={toggleSocials}>
              <AiOutlineInfoCircle /> More Info
            </button>
            {showSocials && (
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.yourwebsite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Slider
        movies={movies}
        tvShows={tvShows}
        moviesGenres={moviesGenres}
        tvShowsGenres={tvShowsGenres}
      />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &: nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
        .social-links {
          position: absolute;
          top: 100%;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background-color: #333;
          padding: 1rem;
          border-radius: 0.5rem;

          a {
            color: white;
            text-decoration: none;

            &:hover {
              color: #1e90ff;
            }
          }
        }
      }
    }
  }
`;
