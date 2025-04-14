import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  // const openHtmlPage = () => { 
  //   window.open('/profile.html', '_blank', 'noopener,noreferrer');
  // };
  
  // const [showMySpace, setShowMySpace] = useState(false);

  // const handleMySpace = () => {
  //   setShowMySpace(true); 
  // };
  return (
    <>
    <div>
      <div className="navbar">
         <Link to = "/"><div className="logo">       
         </div> </Link>
         <div className="searchbar">
          <input placeholder = "Search Freebie" className="searchinput"/>
           <div className="searchiconplace">
            <div className="searchicon">
            <FontAwesomeIcon icon={faSearch} />
            </div>
           </div>
         </div>
           {/* <Link className='link' to ="/"><button className = "home"><b>Home</b></button></Link> */}
           <Link className='link' to = "/MySpace"><button  className = "MySpace"><b>My Space</b></button>
            {/* {showMySpace && <MySpace />} */}
            </Link>
            <Link className='link' to = "/Profile"><button className = "profile"><FontAwesomeIcon icon={faUser} /><b>Profile</b></button></Link>
            
         {/* <button onClick={openHtmlPage} className = 'profile'>
          <FontAwesomeIcon icon={faUser} />
            <b>Profile</b></button> */}
          {/* <button className='login'>
           <b>Login</b>
          </button>
          <button className='signUp'><b>signUp</b></button> */}
         
       </div>
    </div>
    </>
  )
}
