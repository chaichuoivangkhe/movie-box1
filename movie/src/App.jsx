import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import SeatLayout from "./pages/SeatLayout";
import MyBooking from "./pages/MyBooking";
import Payment from "./pages/MomoPayment";
import PaymentReturn from "./pages/PaymentReturn";
import Favorite from "./pages/Favorite";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// import { useAuth } from "./context/AuthContext";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import ListShows from "./pages/admin/ListShows";
import AddShows from "./pages/admin/addShows";
import ListBookings from "./pages/admin/ListBookings";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const App = () => {
  // const { currentUser } = useAuth();
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const { user } = useAppContext();
  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies/:id/:date" element={<ProtectedRoute><ErrorBoundary><SeatLayout /></ErrorBoundary></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><ErrorBoundary><MyBooking /></ErrorBoundary></ProtectedRoute>} />
        <Route path="/payment/:bookingId" element={<ProtectedRoute><ErrorBoundary><Payment /></ErrorBoundary></ProtectedRoute>} />
        <Route path="/payment-return" element={<ProtectedRoute><ErrorBoundary><PaymentReturn /></ErrorBoundary></ProtectedRoute>} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin/*' element={user ? <Layout /> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )} >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;