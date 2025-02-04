import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MySpace from './components/MySpace';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
   return (
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/MySpace" element={<MySpace />} />
          <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
