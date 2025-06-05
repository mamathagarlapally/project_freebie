import React from 'react'
import {jwtDecode} from 'jwt-decode';
import Navbar from './Navbar';
import PasswordModal from './PasswordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';


export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePasswordChange = (data) => {
    console.log("Passwords submitted:", data);
    // Do your validation or API call here
    setIsModalOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);
  useEffect(()=>{
       const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username); // Or decoded.uname depending on your token payload
    }
  },[]);
  return (
    <>
      <Navbar/>
      <div className='headers'>
        <div className='heading'>My profile</div>
      <button  onClick = {toggleMenu}className="menu-button">
         <FontAwesomeIcon icon={faBars} />
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="menu-item">Permissions</div>
          <div className="menu-item">Logout</div>
        </div>
      )}



      </div>
      <div className='profile-box'>
        <div className='profile-pic-box'>
        <div className="profile-pic-wrapper">
        <button  className="edit-icon">📷</button>
        </div>
        
        </div>
        <div className="profile-info">
          <br></br>
        <p className="username">{username}</p>
      <button className='change-pwd' onClick={() => setIsModalOpen(true)}>Change password?</button>
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
     </div>
      </div>
    </>  
  )
}
