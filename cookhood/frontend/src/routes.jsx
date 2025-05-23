import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import CreateOffer from './pages/CreateOffer.jsx';
import Offers from "./pages/Offers.jsx";
import Favorites from "./pages/Favorites.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";

const AppRoutes = () => (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create_offer" element={<CreateOffer/>}/>
            <Route path="/offers" element={<Offers />}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/about" element={<About />}/>
            <Route path="/profile" element={<Profile />}/>
        </Routes>
);

export default AppRoutes;
