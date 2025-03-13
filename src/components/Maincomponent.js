import React from 'react';
import {useState} from 'react';
//import Modal from './Modal';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function Maincomponent() {
  //const [openModal, setOpenModal] = useState(false);
  const [divs, setDivs] = useState([]);
  const DynamicDiv =(data)=>{
    setDivs((prevDivs) => [...prevDivs, {id: prevDivs.length+1, description : data.description, contactno: data.contactno }])
    console.log(data.description, data.contactno);
  };
  return (
    <>
    <div  >
    <div id = "container">
      {divs.map((div)=>(
        <div key={div.id} className='cont-data'><div className = "content">
        <div className='photo' ></div> 
        <div className='text'> 
           <div className = 'uname'>{div.contactno}</div>
           <div className='desc'>{div.description}</div>
          <br></br>
        </div>
      </div></div>
      ))}
    </div> 
      
       {/* <div className = "content"><div className='photo' ></div></div> */}
      </div>
      {/* <div >
          <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button>
      </div> */}

  
      
    </>
  );
};