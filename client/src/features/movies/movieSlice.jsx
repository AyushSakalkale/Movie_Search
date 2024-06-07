import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
("../movielisting/movielisting.jsx");
import movieapi from "../../common/apis/movieapi.js";
import {APIKEY} from "../../common/apis/movieapikey.js";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";
    const response = await movieapi
      .get(`?apikey=${APIKEY}&s=${term}&type=movie`)
      .catch((err) => {
        console.log("THE ERROR IS " + err);
      });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const response = await movieapi.get(
      `?apiKey=${APIKEY}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieapi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, {payload}) => {
    //   state.movies = payload;
    // },==>part of asyncmovies
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
        console.log("Fetched Successfully");
        return {...state, movies: payload};
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected");
      })

      .addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
        console.log("Fetched Successfully");
        return {...state, shows: payload};
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, {payload}) => {
        console.log("Fetched Successfully");
        return {...state, selectMovieOrShow: payload};
      });
  },
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
