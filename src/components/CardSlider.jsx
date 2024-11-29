import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import Card from "./Card";

export default React.memo(function CardSlider({
  title,
  data,
  currentUsername,
  isLiked,
  isFamilyView,
}) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();
  console.log("CardSlider data prop updated:", data);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 100;

    if (direction === "left" && sliderPosition > 0) {
      if (sliderPosition === 1) {
        listRef.current.style.transform = `translateX(0px)`; // Reset to the start
      } else {
        listRef.current.style.transform = `translateX(${200 + distance}px)`;
      }
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 3) {
      listRef.current.style.transform = `translateX(${-200 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  useEffect(() => {
    console.log("CardSlider data prop updated:", data); // Check if removed items are reflected here
  }, [data]);

  return (
    <Container
      className="flex column"
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
      }}
    >
      <h1 className="title">{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="flex slider" ref={listRef}>
          {data?.map((item, index) => {
            // console.log(item);

            const posterPath =
              item.poster_path ||
              item.backdrop_path ||
              item.mediaDetails.poster_path ||
              item.mediaDetails.backdrop_path;

            const title =
              item.title ||
              item.name ||
              item.mediaDetails.title ||
              item.mediaDetails.name;

            if (!posterPath || !title) {
              console.log(`Item at index ${index} is missing data:`, item);
              return null;
            }
            return (
              <Card
                title={title}
                posterPath={posterPath}
                key={item.mediaId || item.id || index}
                data={item}
                currentUsername={currentUsername}
                isLiked={isLiked}
                isFamilyView={isFamilyView}
              />
            );
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(00px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;
