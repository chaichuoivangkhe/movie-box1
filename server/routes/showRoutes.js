import express from "express";
import {
  addShow,
  getNowPlayingMovies,
  getShow,
  getShows,
  getCurrentMovies,
  getMovieTrailer,
  pingInsert,
} from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

// Publicly retrieve 'now playing' movies without requiring admin
showRouter.get("/now-playing", getNowPlayingMovies);
showRouter.post("/add", protectAdmin, addShow);
showRouter.get("/all", getShows);
showRouter.get("/current-movies", getCurrentMovies);
showRouter.get("/:movieId", getShow);
showRouter.get("/:movieId/trailer", getMovieTrailer);
showRouter.get("/ping-insert", pingInsert);

export default showRouter;
