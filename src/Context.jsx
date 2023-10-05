/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );
  const [randomMovieIndex, setRandomMovieIndex] = useState(0);

  const trending = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=a718a8c95a73aa13ba0a074ab6175f8d`;

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

  return (
    <AppContext.Provider
      value={{
        movies,
        loading,
        setLoading,
        setMovieId,
        movieId,
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
