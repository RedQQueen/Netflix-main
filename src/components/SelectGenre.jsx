import React, { useEffect } from "react";
import styled from "styled-components";
import { getMoviesByGenres, getTvShowsByGenres } from "../store";
import { useSelector, useDispatch } from "react-redux";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) =>
    type === "movies" ? state.netflix.moviesGenres : state.netflix.tvShowsGenres
  );

  useEffect(() => {
    if (genres && genres.length > 0) {
      if (type === "movies") {
        dispatch(getMoviesByGenres(`${genres[0].id}`)); // Dispatching default genre
      } else if (type === "tvShows") {
        dispatch(getTvShowsByGenres(`${genres[0].id}`)); // Dispatching default genre
      }
    }
  }, [dispatch, genres, type]);

  const handleChange = (e) => {
    if (type === "movies") {
      dispatch(getMoviesByGenres(e.target.value));
    } else if (type === "tvShows") {
      dispatch(getTvShowsByGenres(e.target.value));
    }
  };

  return (
    <Select className="flex" onChange={handleChange}>
      {selectedGenres && selectedGenres.length > 0 ? (
        selectedGenres.map((genre) => (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        ))
      ) : (
        <option>No genres available</option>
      )}
    </Select>
  );
}

const Select = styled.select``;
