import React, { useContext } from 'react';
//import {useState} from 'react';
import DataContext from '../context/DataContext';
//import Modal from './Modal';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function Maincomponent() {
  //const [divs, setDivs] = useState([]);
  const { datatext } = useContext(DataContext);
  return (
    <>
    <div  >
    <div id = "container">
      {datatext.map((div)=>(
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