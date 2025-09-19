import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import Payment from "./pages/MomoPayment.jsx";
import PaymentReturn from "./pages/PaymentReturn.jsx";
import Favorite from "./pages/Favorite.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { useAuth } from "./context/AuthContext";
import Layout from "./pages/admin/Layout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ListShows from "./pages/admin/ListShows.jsx";
import AddShows from "./pages/admin/AddShows.jsx";
import ListBookings from "./pages/admin/ListBookings";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx";
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