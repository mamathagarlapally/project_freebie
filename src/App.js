import React ,{useState}from 'react';
//import Navbar from './components/Navbar';
import Home from './components/Home';
import MySpace from './components/MySpace';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const handleLogin =(userName, password)=>{
    console.log('user details:',{userName, password});
    setIsLoggedin(true);
  };
   return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ isLoggedin ?  <Home />: <Login onLogin = {handleLogin} />}/>
        <Route path = "/Login" element = {<Login onLogin={handleLogin}/>}/>
        <Route path = "/Signup" element = {<Signup/>}/>
          <Route path="/MySpace" element={<MySpace />}  />
          <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
