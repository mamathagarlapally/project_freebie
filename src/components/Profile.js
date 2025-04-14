import React from 'react'
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
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
          <div className="menu-item">Notifications</div>
          <div className="menu-item">Permissions</div>
          <div className="menu-item">Logout</div>
        </div>
      )}

      </div>
    </>
    
  )
}
