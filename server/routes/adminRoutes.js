import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import {
  getAllBookings,
  getAllShows,
  getDashboardData,
  isAdmin,
  deleteBooking,
  deleteShow,
  deleteMovie,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// Publicly check if current user token has admin role
adminRouter.get("/is-admin", isAdmin);
adminRouter.get("/dashboard", protectAdmin, getDashboardData);
adminRouter.get("/all-shows", protectAdmin, getAllShows);
adminRouter.get("/all-bookings", protectAdmin, getAllBookings);
adminRouter.delete("/booking/:bookingId", protectAdmin, deleteBooking);
adminRouter.delete("/show/:showId", protectAdmin, deleteShow);
adminRouter.delete("/movie/:movieId", protectAdmin, deleteMovie);

export default adminRouter;
