import React from "react";
import CardSlider from "./CardSlider";

export default function Slider({
  movies,
  tvShows,
  moviesGenres,
  tvShowsGenres,
}) {
  const getMoviesFromRange = (from, to) => {
    return movies?.slice(from, to);
  };
  getMoviesFromRange();

  const getTvShowsFromRange = (from, to) => {
    return tvShows?.slice(from, to);
  };
  getTvShowsFromRange();

  return (
    <div>
      {movies?.length > 0 && (
        <>
          <CardSlider
            title="Movies Trending Now"
            data={getMoviesFromRange(0, 10)}
          />
          <CardSlider
            title="New Movie Releases"
            data={getMoviesFromRange(10, 20)}
          />
          <CardSlider
            title="Popular Movies On Netflix"
            data={getMoviesFromRange(20, 30)}
          />
          <CardSlider
            title="Movies You May Like"
            data={getMoviesFromRange(30, 40)}
          />
        </>
      )}
      {tvShows?.length > 0 && (
        <>
          <CardSlider
            title="TV Shows Trending Now"
            data={getTvShowsFromRange(0, 10)}
          />
          <CardSlider
            title="New TV Releases"
            data={getTvShowsFromRange(10, 20)}
          />
          <CardSlider
            title="Popular TV Shows On Netflix"
            data={getTvShowsFromRange(20, 30)}
          />
          <CardSlider
            title="TV Shows You May Like"
            data={getTvShowsFromRange(30, 40)}
          />
        </>
      )}
    </div>
  );
}
