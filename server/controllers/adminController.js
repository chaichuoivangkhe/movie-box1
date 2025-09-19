import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import { clerkClient } from "@clerk/express";
import Movie from "../models/Movie.js";

// API to check if user is admin
export const isAdmin = async (req, res) => {
  try {
    if (process.env.CLERK_DEV_ALLOW_ALL === "true") {
      return res.json({ success: true, isAdmin: true });
    }

    const { userId } = req.auth();
    if (!userId) return res.json({ success: true, isAdmin: false });

    const user = await clerkClient.users.getUser(userId);
    const hasAdminRole =
      user?.privateMetadata?.role === "admin" ||
      user?.publicMetadata?.role === "admin";
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";
    const isWhitelisted = adminEmails.includes(userEmail);

    return res.json({ success: true, isAdmin: hasAdminRole || isWhitelisted });
  } catch (error) {
    return res.json({ success: true, isAdmin: false });
  }
};
// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");

    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// API to get all shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });
    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true })
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete a booking and free up seats
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const show = await Show.findById(booking.show);
    if (show) {
      booking.bookedSeats.forEach((seat) => {
        delete show.occupiedSeats[seat];
      });
      show.markModified('occupiedSeats');
      await show.save();
    }
    await Booking.findByIdAndDelete(bookingId);
    return res.json({ success: true, message: 'Booking deleted and seats freed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete a show (schedule)
export const deleteShow = async (req, res) => {
  try {
    const { showId } = req.params;
    await Show.findByIdAndDelete(showId);
    return res.json({ success: true, message: 'Show deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete a movie and all its shows
export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    await Show.deleteMany({ movie: movieId });
    await Movie.findByIdAndDelete(movieId);
    return res.json({ success: true, message: 'Movie and its shows deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
