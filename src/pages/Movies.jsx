import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getGenresForMovies, getMovies } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);
  const moviesGenres = useSelector((state) => state.netflix.moviesGenres);

  // console.log(genres);
  useEffect(() => {
    dispatch(getGenresForMovies());
    dispatch(getMovies());
  }, [dispatch]);
  console.log(movies);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/movies");
  });
  return (
    <Container>
      <div className="nav">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={moviesGenres} />
        {movies?.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
