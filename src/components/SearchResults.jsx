import React from "react";
import Error from "./Error";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const SearchResults = () => {
  const {
    searchTerm,
    resultsFound,
    setMovieId,
    loading,
    checkFavoriteStatus,
    addMovieToFavorites,
    removeMovieFromFavorites,
  } = useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
  };

  if (loading) {
    return (
      <section>
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else {
    if (resultsFound.length < 1) {
      return (
        <section className="movies-container">
          <Error />
        </section>
      );
    } else {
      return (
        <section className="movies-container">
          <h1>
            Results for <span className="italic">{searchTerm}</span>
          </h1>
          <div className="movie-cards">
            {resultsFound.map((movie) => {
              return (
                <div className="movie-card" key={movie.id}>
                  <div className="movie-card-image">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/image-not-found.jpg"
                      }
                      alt={movie.original_title}
                    />
                    <div className="movie-info-overlay">
                      <div className="content">
                        <p>
                          {movie.overview.length > 200
                            ? `${movie.overview.substring(0, 200)} . . .`
                            : movie.overview}
                        </p>
                        <div className="card-btns">
                          <Link to={`../movie/${movie.id}`} className="link">
                            <button
                              className="btn"
                              onClick={() => handleGetMovieInfo(movie.id)}>
                              More Info
                            </button>
                          </Link>
                          {checkFavoriteStatus(movie.id) ? (
                            <button
                              className="favorite-btn btn"
                              onClick={() =>
                                removeMovieFromFavorites(movie.id)
                              }>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          ) : (
                            <button
                              className="favorite-btn btn"
                              onClick={() =>
                                addMovieToFavorites(
                                  movie.id,
                                  resultsFound.results
                                )
                              }>
                              <FontAwesomeIcon icon={faHeart} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="movie-card-details">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-release">
                      Released on {movie.release_date}
                    </p>
                    <p className="movie-rating">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />{" "}
                      {movie.vote_average.toFixed(2)} / 10
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  }
};

export default SearchResults;
