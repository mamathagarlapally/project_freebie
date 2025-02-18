import React from 'react';
//import {useState} from 'react';
//import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function Maincomponent({item}) {
  
  return (
    <>
    <div  >
      <h2>{item.title}</h2>
      <div className='cont-data'>
       <div className = "content">
        <div className='photo' ></div> 
        <div className='text'>mamathagarlapally
          <br></br>
          It is a apron , it contains sphn logo on it, it a second hand thing,
          bought in 2022 november
          <button className="like-button">
          < FontAwesomeIcon className='white-heart' icon={faHeart} /> Like
          </button>
        </div>

       </div>
       {/* <div className = "content"><div className='photo' ></div></div> */}
      </div>
      {/* <div >
          <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button>
      </div> */}
    </div>
      {/* {openModal && <Modal closeModal = {setOpenModal} />} */}
      
    </>
  );
};