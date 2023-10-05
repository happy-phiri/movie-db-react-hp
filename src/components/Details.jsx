/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Error from "./Error";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState("");
  const [video, setVideo] = useState("");

  const {
    setLoading,
    loading,
    checkFavoriteStatus,
    removeMovieFromFavorites,
    addMovieToFavorites,
  } = useGlobalContext();

  const params = useParams();

  // MOVIE DETAIL AND VIDEO URLS
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US?api_key=a718a8c95a73aa13ba0a074ab6175f8d&append_to_response=credits`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/videos?language=en-US&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE4YThjOTVhNzNhYTEzYmEwYTA3NGFiNjE3NWY4ZCIsInN1YiI6IjY0ZTQ3ZTlhMWZlYWMxMDExYjJiMTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpgc6SU5J5FiIdjMy8rxrVa4PpmR2UZLXnd_nxr7oWI",
    },
  };

  // GET MORE DETAILS ABOUT A SPECIFIC MOVIE
  const fetchMovieDetails = async (url) => {
    setLoading(true);
    try {
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => setDetails(response));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!params.movieId) return;
    fetchMovieDetails(movieDetailsUrl);
  }, [params.movieId]);

  //GET VIDEO OF MOVIE
  const fetchVideo = async (url) => {
    setLoading(true);
    try {
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          for (const result of response.results) {
            if (
              result.name === "Official Trailer" ||
              "Main Trailer" ||
              "Teaser Trailer"
            ) {
              setVideo(result.key);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!params.movieId) return;
    fetchVideo(videoUrl);
  }, [params.movieId]);

  if (loading) {
    return (
      <section>
        <img src="/Spinner-1s-200px.svg" alt="Spinning wheel" />
      </section>
    );
  } else if (details) {
    // GET GENRES FOR MOVIE
    const genreElements = details.genres.map((genre) => {
      return <span key={genre.id}>{genre.name}</span>;
    });

    //GET SPOKEN LANGUAGES
    const spokenLanguages = details.spoken_languages.map((language) => {
      return (
        <span key={details.spoken_languages.indexOf(language)}>
          {language.english_name}
        </span>
      );
    });

    //GET PRODUCTION COUNTRIES
    const countries = details.production_countries.map((country) => {
      return (
        <span key={details.production_countries.indexOf(country)}>
          {country.name}
        </span>
      );
    });
    //GET FIRST TWENTY MOVIE CAST
    const topCast = details.credits.cast.slice(0, 25);

    console.log(details);

    return (
      <section className="details-container">
        <div className="details-top">
          <h1 className="details-top-title">{details.title}</h1>
          <p className="details-top-tagline">{details.tagline}</p>
        </div>

        <div className="details-video-container">
          {video ? (
            <iframe
              className="video"
              title={details.title}
              src={`https://www.youtube.com/embed/${video}`}></iframe>
          ) : (
            <img
              className="details-top-img"
              src={
                details.poster_path
                  ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
                  : "/image-not-found.jpg"
              }
              alt={details.title}
            />
          )}
        </div>
        <div className="details">
          <div className="details-overview">
            <p className="overview">{details.overview}</p>
            <div className="details-btn">
              <a
                href={details.homepage}
                target="_blank"
                rel="noreferrer"
                className="btn">
                More Info
              </a>
              {checkFavoriteStatus(details.id) ? (
                <button
                  className="favorite-btn btn"
                  onClick={() => removeMovieFromFavorites(details.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              ) : (
                <button
                  className="favorite-btn btn"
                  onClick={() => addMovieToFavorites(details.id, details)}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              )}
            </div>
          </div>
          <div className="details-stats">
            <p>Runtime: {details.runtime} minutes</p>
            <p>Release Date: {details.release_date}</p>
            <p>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />{" "}
              {details.vote_average.toFixed(2)} / 10
            </p>
            <p>
              Languages:{" "}
              <span className="italic">
                {spokenLanguages.reduce((prev, curr) => [prev, ", ", curr])}
              </span>
            </p>
            <p>
              Produced in:{" "}
              <span className="italic">
                {countries.reduce((prev, curr) => [prev, ", ", curr])}
              </span>
            </p>
            <p>
              Genres:{" "}
              <span className="italic">
                {genreElements.reduce((prev, curr) => [prev, ", ", curr])}
              </span>
            </p>
          </div>
        </div>
        <div className="cast">
          <h2>Main Cast</h2>
          <div className="cast-cards">
            {topCast.map((cast) => {
              const { character, name, profile_path, cast_id } = cast;
              return (
                <div className="cast-card" key={cast_id}>
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/original${profile_path}`
                        : "/image-not-found.jpg"
                    }
                    alt=""
                  />
                  <p className="cast-card-character">{character}</p>
                  <p className="cast-card-name">{name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="companies">
          <h2>Production Companies</h2>
          <div className="company-cards">
            {details.production_companies.map((company) => {
              const { name, logo_path, id } = company;
              return (
                <div className="company-card" key={id}>
                  <img
                    src={
                      logo_path
                        ? `https://image.tmdb.org/t/p/w300${logo_path}`
                        : "/image-not-found.jpg"
                    }
                    alt=""
                  />
                  <p className="company-card-name">{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <Error />
      </section>
    );
  }
};

export default Details;
