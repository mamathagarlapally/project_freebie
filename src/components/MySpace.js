import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import {useState} from 'react';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  return (

    <>
    <Navbar/>
    <div className={openModal ? 'blurred':''}>
    <div><h><b>MySpace</b></h></div>
    <div className='tags'>My Likes</div><br></br>
    <div className='tags'>  My Drafts</div><br></br>
    <div className='tags'> My Uploads</div>
    <br></br>
    <div >
          <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button>
      </div>
    </div>
    
     {openModal && <Modal closeModal = {setOpenModal} />}
    </>

  )
}
