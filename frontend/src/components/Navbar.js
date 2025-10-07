import React from 'react'
import {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import DataContext from '../context/DataContext';

export default function Navbar() {
    const { uname,setUname } = useContext(DataContext);
     
    const navigate = useNavigate();

  const handleChange = (e) => {
    setUname(e.target.value);
  };

  const handleSearchClick = () => {
    if (uname && uname.trim() !== "") {
      navigate('/search');  // ✅ go to search page
    } else {
      alert("Please enter something to search!");
    }
  };
    
  return (
    <>
    <div>
      <div className="navbar">
         <Link to = "/"><div className="logo">       
         </div> </Link>
         <div className="searchbar">
          <input placeholder = "Search Freebie" className="searchinput" onChange={handleChange}/>
           <div className="searchiconplace">
            <div className="searchicon" onClick={handleSearchClick}>
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
