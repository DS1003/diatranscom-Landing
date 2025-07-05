import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Profile from './components/Profile';
import Tresor from './components/Blog';

// Lazy load the Dashboard component
const Dashboard = lazy(() => import('./components/Contact'));

const AppRoutes = () => {
  
  return (
    <Suspense fallback={<div className='spinner'>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tresor" element={<Tresor />} />
        {/* Add more routes as needed */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
