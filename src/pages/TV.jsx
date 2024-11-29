import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getGenresForTvShows, getTvShows } from "../store";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import styled from "styled-components";

export default function TV() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tvShows = useSelector((state) => state.netflix.tvShows);
  const tvShowsGenres = useSelector((state) => state.netflix.tvShowsGenres);

  console.log(tvShows);
  console.log(tvShowsGenres);

  useEffect(() => {
    dispatch(getGenresForTvShows());
    dispatch(getTvShows());
  }, [dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/tv");
  });
  return (
    <Container>
      <div className="nav">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={tvShowsGenres} />
        {tvShows.length ? <Slider tvShows={tvShows} /> : <NotAvailable />}
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
