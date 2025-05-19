import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import CreateOffer from './pages/CreateOffer.jsx';

const AppRoutes = () => (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create_offer" element={<CreateOffer/>}/>
        </Routes>
);

export default AppRoutes;
