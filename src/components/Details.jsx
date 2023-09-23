import React from "react";
import Error from "./Error";
import { useGlobalContext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const Details = () => {
  const {
    details,
    loading,
    video,
    checkFavoriteStatus,
    removeMovieFromFavorites,
    addMovieToFavorites,
  } = useGlobalContext();

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
