import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import Favorites from "./Favorites";

const Hero = () => {
  const {
    movies,
    randomMovieIndex,
    addMovieToFavorites,
    favoriteMovies,
    setMovieId,
    checkFavoriteStatus,
    removeMovieFromFavorites,
  } = useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
  };

  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(
                https://image.tmdb.org/t/p/original${movies.results[randomMovieIndex].backdrop_path}
              )`,
      }}>
      <div className="hero">
        <p className="trending">Playing</p>
        <h1 className="hero-title">{movies.results[randomMovieIndex].title}</h1>
        <p className="hero-overview">
          {movies.results[randomMovieIndex].overview}
        </p>
        <p className="movie-rating">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          {"   "}
          {movies.results[randomMovieIndex].vote_average.toFixed(2)} / 10
        </p>
        <div className="hero-btns">
          <Link
            to={`movie/${movies.results[randomMovieIndex].id}`}
            className="link">
            <button
              className="btn"
              onClick={() =>
                handleGetMovieInfo(movies.results[randomMovieIndex].id)
              }>
              More Info
            </button>
          </Link>
          {checkFavoriteStatus(movies.results[randomMovieIndex].id) ? (
            <button
              className="favorite-btn btn"
              onClick={() =>
                removeMovieFromFavorites(movies.results[randomMovieIndex].id)
              }>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            <button
              className="favorite-btn btn"
              onClick={() =>
                addMovieToFavorites(
                  movies.results[randomMovieIndex].id,
                  movies.results
                )
              }>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          )}
        </div>
      </div>

      {/* FAVORITE MOVIES */}
      <div className="hero-favorites">
        {favoriteMovies.length > 0 && <Favorites />}
      </div>
    </header>
  );
};

export default Hero;
