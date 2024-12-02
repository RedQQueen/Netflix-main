import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbHomeOff } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { firebaseAuth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import video from "../assets/ostrich-video.mp4";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeFromLikedMedia, removeFromSharedMedia } from "../store";

export default React.memo(function Card({
  title,
  data,
  posterPath,
  isFamilyView,
  isLiked,
  currentUser,
  currentUsername,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  const canEdit = data.markedBy === currentUser || currentUsername;

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else navigate("/login");
    });
  }, [navigate]);

  const addToList = async () => {
    try {
      const mediaType = data.title ? "movie" : "tv";
      console.log("Sending data:", { email, mediaId: data.id, mediaType });
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        mediaId: data.id,
        mediaType,
      });
      console.log("added to list");
    } catch (error) {
      console.log(error);
    }
  };

  const addToFamilyList = async () => {
    try {
      const mediaType = data.title ? "movie" : "tv";
      console.log("Sending data:", { email, mediaId: data.id });
      await axios.post("http://localhost:5000/api/user/addToFamily", {
        email,
        mediaId: data.id,
        mediaType,
      });
      console.log("added to family want to watch list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        onClick={() => navigate("/player")}
      />
      <h3>{title}</h3>

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              onClick={() => navigate("/player")}
              autoPlay
              loop
              controls
              muted
            />
          </div>
          <div className="info-container flex column ">
            <h3 className="name" onClick={() => navigate("/player")}>
              {data.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {!isFamilyView && !isLiked ? (
                  // Main card where the user can add to their list and family list
                  <>
                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                    <AiFillHome
                      title="Add to family list"
                      onClick={addToFamilyList}
                    />
                  </>
                ) : isFamilyView && canEdit ? (
                  // Family view where the current user can edit their own liked list
                  <TbHomeOff
                    title="Remove From User Liked List"
                    onClick={() =>
                      dispatch(
                        removeFromSharedMedia({ email, mediaId: data.mediaId })
                      )
                    }
                  />
                ) : isFamilyView && !canEdit ? (
                  // Family view where the current user is viewing another user's list
                  <TbHomeOff title="View Only" />
                ) : (
                  // Standard view for removing from the liked list or adding to family list
                  <>
                    <RxCross2
                      title="Remove From User Liked List"
                      onClick={() =>
                        dispatch(
                          removeFromLikedMedia({ email, movieId: data.id })
                        )
                      }
                    />
                    <AiFillHome
                      title="Add to family list"
                      onClick={addToFamilyList}
                    />
                  </>
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex"></div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`

  max-width: 230px;
  width: 200px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 60%;
    z-index: 10;
  }
    h3 {
    text-align:center;}
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons{
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
      .genres{
        ul {
         gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
    }
  }
`;
