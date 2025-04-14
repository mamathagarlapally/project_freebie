import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import loginPage from './login-page.png';
export default function Login({onLogin}) {
  const [userName, setUserName] =useState('');
  const  [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin =(event)=>{
    event.preventDefault();
    onLogin(userName, password);
    navigate('/');
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
