import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getUserLikedMedia } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likedMedia = useSelector((state) => state.netflix.likedMedia);
  console.log(likedMedia);
  const likedMoviesOnly = likedMedia
    .filter((item) => item.mediaType === "movie")
    .map((item) => item.mediaDetails);

  const likedTvShowsOnly = likedMedia
    .filter((item) => item.mediaType === "tv")
    .map((item) => item.mediaDetails);

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMedia(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="nav">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content column flex">
        <h2>My Liked Movies</h2>
        <div className="grid flex">
          {likedMoviesOnly && likedMoviesOnly.length > 0 ? (
            likedMoviesOnly.map((item, index) => (
              <Card
                title={item.title}
                posterPath={item.poster_path || item.backdrop_path}
                key={item.id}
                data={item}
                isLiked={true}
                isFamilyView={false}
              />
            ))
          ) : (
            <p>No liked movies.</p>
          )}
        </div>

        <h2>My Liked TV Shows</h2>
        <div className="grid flex">
          {likedTvShowsOnly && likedTvShowsOnly.length > 0 ? (
            likedTvShowsOnly.map((item, index) => (
              <Card
                title={item.name}
                posterPath={item.poster_path || item.backdrop_path}
                key={item.id}
                data={item}
                isLiked={true}
                isFamilyView={false}
              />
            ))
          ) : (
            <p>No liked TV shows.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h2 {
      font-size: 3rem;
      padding: 0;
      margin: 0;
      margin-left: 1rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
