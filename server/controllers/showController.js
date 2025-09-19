import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
//API to get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );

    const movies = data.results;
    res.json({ success: true, movies: movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
// Quick connectivity test: insert a lightweight show document
export const pingInsert = async (req, res) => {
  try {
    const doc = await Show.create({
      movie: "ping-test",
      showDateTime: new Date(),
      showPrice: 1,
      occupiedSeats: {},
    });
    return res.json({ success: true, id: doc._id });
  } catch (error) {
    console.error("Ping insert error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// API to add a new show to the database
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;
    // Ensure movie id matches schema types (String in Movie._id and Show.movie)
    const movieIdString = String(movieId);

    // Basic validations for clearer errors
    if (!movieId && movieId !== 0) {
      return res.status(400).json({ success: false, message: "Thiếu movieId" });
    }
    if (!Array.isArray(showsInput) || showsInput.length === 0) {
      return res.status(400).json({ success: false, message: "Thiếu hoặc sai định dạng showsInput" });
    }
    if (typeof showPrice !== "number" || Number.isNaN(showPrice) || showPrice <= 0) {
      return res.status(400).json({ success: false, message: "Giá vé showPrice phải là số > 0" });
    }
    if (!process.env.TMDB_API_KEY) {
      return res.status(500).json({ success: false, message: "Thiếu TMDB_API_KEY trên server" });
    }

    let movie = await Movie.findById(movieIdString);

    if (!movie) {
      // Fetch movie details and credits from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieIdString}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieIdString}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
      ]);
      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;
      const movieDetails = {
        _id: movieIdString,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };
      // Add movie to the database
      movie = await Movie.create(movieDetails);
    }
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      if (!Array.isArray(show.time)) return;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieIdString,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });
    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }
    res.json({ success: true, message: "Thêm lịch chiếu thành công" });
  } catch (error) {
    console.error("addShow error:", error?.response?.data || error.message || error);
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.status_message ||
      error?.response?.data?.message ||
      error?.message ||
      "Lỗi không xác định";
    res.status(status).json({ success: false, message });
  }
};
// API to get all shows from the database
export const getShows = async (req, res) => {
  try {
    // Fetch all shows sorted by date/time
    const shows = await Show.find().sort({ showDateTime: 1 });
    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get unique movies that currently have upcoming shows
export const getCurrentMovies = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const movieMap = new Map();
    shows.forEach((s) => {
      if (s.movie && !movieMap.has(s.movie._id)) {
        movieMap.set(s.movie._id, s.movie);
      }
    });

    const movies = Array.from(movieMap.values());
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API: get YouTube trailer key for a movie from TMDB
export const getMovieTrailer = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
    );

    const videos = data?.results || [];
    const trailer =
      videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
      videos.find((v) => v.site === "YouTube");

    if (!trailer) return res.json({ success: true, key: null });

    return res.json({ success: true, key: trailer.key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// API to get a single show from the database
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    // get all upcoming shows for the movie
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });
    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
