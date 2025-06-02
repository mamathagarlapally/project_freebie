import React, {useState} from 'react';
import loginPage from './login-page.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function Signup() {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e)=>{
    e.preventDefault();
    if (pwd !== cpwd) {
      alert("Passwords do not match! Please try again.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/Signup', {
       uname: username,
       pwd: pwd
    });
     navigate('/Login');
    } catch (err) {
    if (err.response && err.response.status === 400) {
    alert(err.response.data.message); // Show custom message from backend
    } else {
    alert("Something went wrong. Please try again.");
    console.error(err);
   }
   }

  };
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
          <input className='inputf' type = "username" placeholder='enter username' onChange={(e)=>setUsername(e.target.value)}></input></div>
        <div className='pwd'>
          <label>Password</label>
          <input className='inputf' type = "password" placeholder='enter password' onChange={(e)=>setPwd(e.target.value)}></input><br></br>
          <label>Confirm Password</label>
          <input className='inputf' type = "password" placeholder='enter password again' onChange = {(e)=>setCpwd(e.target.value)}></input>
        </div ><br></br>
        <button  onClick = {handleRegister} className= "reg-btn" type = "submit">Register</button><br></br>
      </form>
    </div>  
    </div>
    </div>
    </div>
  )
}
