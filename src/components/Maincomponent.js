import React from 'react';
import {useState} from 'react';
import Modal from './Modal';


export default function Maincomponent({item}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <h2>{item.title}</h2>
      <div className = 'additem'>
      <div className={openModal ? 'blurred' : ''}>
              <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button></div>
      </div>
      
      {openModal && <Modal closeModal = {setOpenModal}/>}
    </div>
  );
}
