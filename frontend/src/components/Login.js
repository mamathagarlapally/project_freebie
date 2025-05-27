import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import loginPage from './login-page.png';
export default function Login({onLogin}) {
  const [userName, setUserName] =useState('');
  const  [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin =async(event)=>{
    event.preventDefault();
    if (!userName || !password) {
      alert("Please enter both username and password.");
      return;
    }
    try{
      const res = await axios.post('http://localhost:5000/api/Login',{
        username :userName,
        password: password
      });
      if(res.data.message === "Login successful!"){
        onLogin();
        navigate('/');
      }
      else {
        alert("incorrect username or password");
      } 
    }
    catch(err){
      console.log(err);
    }
  }
  const handleSignup  = ()=>{
     navigate('/Signup');
  };
  return (
    <div className='bgc'>
      <img className='logo-img' src = {loginPage} alt = "logo of login-page"></img>
    <div className='page'>
      <img className = "userimg" src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt = "logo of user"></img>
     < div className='login-box'>
      <form onSubmit={handleLogin}>
        <label className = 'welcome'>Welcome!</label>
        <div className='uname'>
          <label className='uname-lbl'>Username</label>
          <input className='inputf' type = "username" placeholder='enter username' value = {userName} onChange={(e)=> setUserName(e.target.value)}></input>
        </div>
        <div className='pwd'>
          <label>Password</label>
          <input className='inputf' type = "password" placeholder='enter password' value = {password} onChange = {(e)=> setPassword(e.target.value)}></input>
        </div >
        <button className= "login-btn" type = "submit">Login</button><br></br>
        <label className='acc-lbl' > Don't have an account? </label>
        <button type = "button" onClick = {handleSignup} className='sign-btn'>SignUp</button>
      </form>
    </div>  
    </div>
    </div>
  )

}
