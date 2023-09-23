import React from "react";
import Hero from "./Hero";
import Error from "./Error";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
  const {
    movies,
    loading,
    setMovieId,
    addMovieToFavorites,
    checkFavoriteStatus,
    removeMovieFromFavorites,
  } = useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
  };

  if (loading) {
    return (
      <section className="movies-container">
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else {
    if (!movies.results) {
      return (
        <section className="movies-container">
          <Error />
        </section>
      );
    } else {
      return (
        <section>
          {/* HERO SECTION */}
          <Hero />

          <section className="movies-container">
            <h2>Now Playing</h2>

            <div className="movie-cards">
              {movies.results.map((movie) => {
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
                            <Link to={`movie/${movie.id}`} className="link">
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
                                  addMovieToFavorites(movie.id, movie)
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
        </section>
      );
    }
  }
};

export default Movies;
