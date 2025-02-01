import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const openHtmlPage = () => { 
    window.open('/profile.html', '_blank', 'noopener,noreferrer');
  };
  return (
    <div>
      <div className="navbar">
         <div className="logo">       
          </div> 
         <div className="searchbar">
          <input placeholder = "Search Freebie" className="searchinput"/>
           <div className="searchiconplace">
            <div className="searchicon">
            <FontAwesomeIcon icon={faSearch} />
            </div>
           </div>
         </div>
         
         <button onClick={openHtmlPage} className = 'profile'>
          <FontAwesomeIcon icon={faUser} />
            <b>Profile</b></button>
          {/* <button className='login'>
           <b>Login</b>
          </button>
          <button className='signUp'><b>signUp</b></button> */}
         
       </div>  
    </div>
  )
}
