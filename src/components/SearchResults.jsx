/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Error from "./Error";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const [resultsFound, setResultsFound] = useState([]);

  const {
    setLoading,
    setMovieId,
    loading,
    checkFavoriteStatus,
    addMovieToFavorites,
    removeMovieFromFavorites,
  } = useGlobalContext();

  const params = useParams();

  const searchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${params.searchTerm}&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE4YThjOTVhNzNhYTEzYmEwYTA3NGFiNjE3NWY4ZCIsInN1YiI6IjY0ZTQ3ZTlhMWZlYWMxMDExYjJiMTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpgc6SU5J5FiIdjMy8rxrVa4PpmR2UZLXnd_nxr7oWI",
    },
  };

  //FETCH SEARCH RESULTS
  const fetchSearchedMovie = async () => {
    setLoading(true);
    try {
      await fetch(searchUrl, options)
        .then((response) => response.json())
        .then((response) => setResultsFound(response.results));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!params.searchTerm) return;
    fetchSearchedMovie();
  }, [params.searchTerm]);

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
            Results for <span className="italic">{params.searchTerm}</span>
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
      );
    }
  }
};

export default SearchResults;
