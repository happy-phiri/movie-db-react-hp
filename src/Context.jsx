/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsFound, setResultsFound] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [details, setDetails] = useState("");
  const [video, setVideo] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );
  const [randomMovieIndex, setRandomMovieIndex] = useState(0);

  const trending = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${searchTerm}&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US?api_key=a718a8c95a73aa13ba0a074ab6175f8d&append_to_response=credits`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzE4YThjOTVhNzNhYTEzYmEwYTA3NGFiNjE3NWY4ZCIsInN1YiI6IjY0ZTQ3ZTlhMWZlYWMxMDExYjJiMTY5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpgc6SU5J5FiIdjMy8rxrVa4PpmR2UZLXnd_nxr7oWI",
    },
  };

  // CHECK IF MOVIE IS IN FAVORITES LIST
  const checkFavoriteStatus = (id) => {
    return favoriteMovies.find((movie) => movie.id === id);
  };

  // ADD TO FAVORITES
  const addMovieToFavorites = (id, movie) => {
    const alreadyFavorite = favoriteMovies.find((movie) => movie.id === id);

    if (alreadyFavorite) {
      return;
    } else {
      // const movie = arr.find((movie) => movie.id === id);
      const updatedFavorites = [movie, ...favoriteMovies];
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }
  };

  //REMOVE FROM FAVORITES
  const removeMovieFromFavorites = (id) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  // FETCH TRENDING MOVIES ON HOMEPAGE
  const fetchTrendingMovies = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => setMovies(response));
    } catch (err) {
      console.log(err);
    }
    setRandomMovieIndex(Math.floor(Math.random() * 20));
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingMovies(trending);
  }, [trending]);

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
    if (!searchTerm) return;
    fetchSearchedMovie();
  }, [searchUrl]);

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
    if (!movieId) return;
    fetchMovieDetails(movieDetailsUrl);
  }, [movieId]);

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
    if (!movieId) return;
    fetchVideo(videoUrl);
  }, [movieId]);

  return (
    <AppContext.Provider
      value={{
        movies,
        loading,
        setSearchTerm,
        searchTerm,
        resultsFound,
        fetchSearchedMovie,
        setMovieId,
        movieId,
        details,
        video,
        favoriteMovies,
        setFavoriteMovies,
        addMovieToFavorites,
        removeMovieFromFavorites,
        checkFavoriteStatus,
        randomMovieIndex,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
