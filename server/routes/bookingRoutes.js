import express from "express";
import {
  createBooking,
  getOccupiedSeats,
  confirmPayment,
  getBookingStatus,
  getBookingDetail,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", createBooking);
bookingRouter.get("/seats/:showId", getOccupiedSeats);
bookingRouter.post("/confirm", confirmPayment);
bookingRouter.get("/status/:bookingId", getBookingStatus);
bookingRouter.get("/detail/:bookingId", getBookingDetail);

export default bookingRouter;
