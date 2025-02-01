import React from 'react';
import { useState} from 'react';
import Navbar from './components/Navbar';
import Compone from './components/Compone';
import Apron from './components/Apron';
import Drafter from './components/Drafter';
import Calci from './components/Calci';
import Questionpaper from './components/Questionpaper';
import Books from './components/Books';
import Other from './components/Other';
import Modal from './components/Modal';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [divs, setDivs] = useState([]);
  const addDiv = () => { 
      const newDivs = ([...divs, `Div ${divs.length + 1}`]); 
      setDivs(newDivs);
  };
  return (
    <>
     <Router>
     <Navbar></Navbar>
     <Compone></Compone>
      <Routes>
        <Route path = "/" element = {<Apron/>}/>
        <Route path = "/Drafter" element = {<Drafter/>}/>
        <Route path = "/Calci" element = {<Calci/>}/>
        <Route path = "/Questionpaper" element = {<Questionpaper/>}/>
        <Route path = "/Books" element = {<Books/>}/>
        <Route path = "/Other" element = {<Other/>}/>
        <Route path = "/div" element = {<Apron divs = {divs} />}/>
        <Route path = "/Add" element = {<Modal addDiv={addDiv} />}/>
      </Routes>
     </Router>
    </>
  );
}

export default App;
