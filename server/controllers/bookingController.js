import { populate } from "dotenv";
import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

// Function to check availability of selected seats for a show
const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;
    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaker = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaker;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
export const createBooking = async (req, res) => {
  try {
    const isDevBypass = process.env.CLERK_DEV_ALLOW_ALL === "true";
    const authUserId = typeof req.auth === "function" ? req.auth().userId : null;
    const userId = authUserId || (isDevBypass ? "dev-user" : null);
    if (!userId) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // Ensure user exists in our DB for population in admin views
    if (userId) {
      try {
        // 1) Prefer existing DB user (do not overwrite custom name from DB)
        const existing = await User.findById(userId);
        if (!existing) {
          // 2) If not exists, try Clerk profile
          let name = "User";
          let email = "";
          let image = "";
          try {
            const clerkUser = await clerkClient.users.getUser(userId);
            name = clerkUser?.firstName || clerkUser?.username || clerkUser?.emailAddresses?.[0]?.emailAddress || name;
            email = clerkUser?.primaryEmailAddress?.emailAddress || clerkUser?.emailAddresses?.[0]?.emailAddress || email;
            image = clerkUser?.imageUrl || image;
          } catch (_) {}

          // 3) Upsert new user with gathered info
          await User.findByIdAndUpdate(
            userId,
            { _id: userId, name, email, image },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        }
      } catch (e) {
        console.log("sync user error", e?.message || e);
      }
    }

    const isSeatAvailable = await checkSeatAvailability(showId, selectedSeats);
    if (!isSeatAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Selected seats are not available" });
    }
    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid: false,
    });

    res.json({
      success: true,
      message: "Booking created successfully. Proceed to payment",
      data: booking,
    });

    // Proceed with creating the booking
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Confirm payment and lock seats for a booking
export const confirmPayment = async (req, res) => {
  try {
    const isDevBypass = process.env.CLERK_DEV_ALLOW_ALL === "true";
    const authUserId = typeof req.auth === "function" ? req.auth().userId : null;
    const userId = authUserId || (isDevBypass ? "dev-user" : null);
    if (!userId) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }
    const { bookingId, buyerName, buyerPhone, buyerEmail } = req.body;
    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Missing bookingId" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    if (String(booking.user) !== String(userId)) {
      return res.status(403).json({ success: false, message: "forbidden" });
    }
    if (booking.isPaid) {
      return res.json({ success: true, message: "Booking already paid" });
    }

    const showData = await Show.findById(booking.show);
    if (!showData) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }

    // Lock seats
    booking.bookedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = booking.user;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    booking.isPaid = true;
    await booking.save();

    // Optionally update display name/email in our local User DB for admin listing
    if (buyerName || buyerEmail || buyerPhone) {
      try {
        const update = {};
        if (buyerName) update.name = buyerName;
        if (buyerEmail) update.email = buyerEmail;
        // We don't store phone on User schema; skip or add if schema updated later
        await User.findByIdAndUpdate(userId, update, { upsert: true });
      } catch (_) {}
    }

    return res.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get booking status by id
export const getBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    return res.json({ success: true, isPaid: booking.isPaid });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get booking detail (amount, seats...)
export const getBookingDetail = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate({
      path: 'show',
      populate: { path: 'movie' },
    });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    return res.json({ success: true, booking });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
