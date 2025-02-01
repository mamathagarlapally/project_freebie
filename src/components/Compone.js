import React from 'react';
import { Link } from 'react-router-dom';

function handleApron(){
  console.log("Apron clicked");
}


export default function Compone(){
    return(
     <>
      <div className='components'>
         <Link to = "/">
         <button onClick= {handleApron} className = "Apron"><b>Apron</b></button>
         </Link>
         <Link to = "/Drafter"><button className = "Drafter"><b>Drafter</b></button></Link>
         <Link to = "/Calci"><button className = "Calci"><b>Calci</b></button></Link>
         <Link to = "/Questionpaper"><button className = "qp"><b>Question Paper</b></button></Link>
         <Link to = "/Books"><button className = "Books"><b>Books</b></button></Link>
         <Link to = "/Other"><button className = "other"><b>Other</b></button></Link>
      </div>
      
      {/* <div className='box'>
        <div className='pic'>photo</div>
        <div className='text'>details</div>
      </div> */}
      
     </>
    )
}