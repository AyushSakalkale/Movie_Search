import React, {useEffect} from "react";
import MovieListing from "../movielisting/movielisting.jsx";
import {useDispatch} from "react-redux";
// import {addMovies} from "../../features/movies/movieSlice.jsx"; -->no need as fetchasyncmovies
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice.jsx";
const Home = () => {
  const movieText = "Harry";
  const showText = "FRIENDS";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, []);
  return (
    <div>
      <div className="banner-img">
        <MovieListing />
      </div>
    </div>
  );
};

export default Home;
