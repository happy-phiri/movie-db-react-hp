import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Favorites = () => {
  const { favoriteMovies, setMovieId, removeMovieFromFavorites } =
    useGlobalContext();

  const handleGetMovieInfo = (id) => {
    setMovieId(id);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section className="favorites-container">
      <h2>Favorites</h2>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        //ssr={true}
        infinite={false}
        //autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
        {favoriteMovies.map((movie) => {
          const { poster_path, title, id } = movie;
          return (
            <div className="movie-card-image" key={id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "/image-not-found.jpg"
                }
                alt={title}
              />
              <div className="movie-info-overlay">
                <div className="content">
                  <div className="card-btns">
                    <Link to={`movie/${id}`} className="link">
                      <button
                        className="btn"
                        onClick={() => handleGetMovieInfo(movie.id)}>
                        More
                      </button>
                    </Link>
                    <button
                      className="favorite-btn btn"
                      onClick={() => removeMovieFromFavorites(movie.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default Favorites;
