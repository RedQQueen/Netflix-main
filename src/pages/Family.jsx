import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getUserSharedMedia } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";

export default React.memo(function Family() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const [currentUsername, setCurrentUsername] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sharedMedia = useSelector((state) => state.netflix.wantToWatch);
  console.log("sharedMedia in Family:", sharedMedia);

  useEffect(() => {
    if (email) {
      dispatch(getUserSharedMedia(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
        setCurrentUsername(currentUser.displayName);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    console.log("Family component re-rendered with sharedMedia:", sharedMedia);
  }, [sharedMedia]);

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
        <h1>Let's see what the family want to watch...</h1>
        {sharedMedia && sharedMedia.length > 0 ? (
          sharedMedia.every((user) => user.media.length === 0) ? (
            <p>No shared shows available.</p>
          ) : (
            // Filter to only users with items in their `media` array
            sharedMedia
              .filter((user) => user.media && user.media.length > 0)
              .map((user, index) => (
                <div key={user.username || index} className="user-section">
                  <h2>{`${
                    user.username || "User"
                  } would like to watch these shows`}</h2>
                  <CardSlider
                    key={Date.now()}
                    data={user.media}
                    isFamilyView={true}
                    isLiked={false}
                    currentUsername={currentUsername}
                  />
                </div>
              ))
          )
        ) : (
          <p>No shared shows available.</p>
        )}
      </div>
    </Container>
  );
});

const Container = styled.div`
  .content {
    h1 {
      font-size: 3rem;
    }
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h2 {
      font-size: 2rem;
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
