import React from 'react';
import loginPage from './login-page.png';
import {useNavigate} from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  const handleRegister = ()=>{
     navigate('/Login');
  }
  return (
    <div>
      <div className='bgc'>
      <img className='logo-img' src = {loginPage} alt = "logo of login-page"></img>
    <div className='pages'>
      <img className = "userimg" src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" alt = "logo of user"></img>
     < div className='login-box'>
      <form >
        <label className = 'welcome'>Welcome!</label>
        <div className='uname'>
          <label className='uname-lbl'>Username</label>
          <input className='inputf' type = "username" placeholder='enter username' ></input></div>
        <div className='pwd'>
          <label>Password</label>
          <input className='inputf' type = "password" placeholder='enter password'></input><br></br>
          <label>Confirm Password</label>
          <input className='inputf' type = "password" placeholder='enter password again'></input>
        </div ><br></br>
        <button  onClick = {handleRegister} className= "reg-btn" type = "submit">Register</button><br></br>
      </form>
    </div>  
    </div>
    </div>
    </div>
  )
}
