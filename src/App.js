import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import ArtPiecesByCategory from './pages/ArtPiecesByCategory';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import ArtPieceDetails from './pages/ArtPieceDetails';
import ViewCart from './pages/ViewCart';
import Checkout from './pages/Checkout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId/artpieces" element={<ArtPiecesByCategory />} />
        <Route path="/pieces/:artId" element={<ArtPieceDetails />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/purchasehistory" element={<OrderHistory />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/mycart" element={<ViewCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
    </UserProvider>
  );
}

export default App;