import {useState} from 'react'; 
import React from 'react';
import Modal from './Modal';

export default function Apron({divs}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
     {/* <div> {divs.map((div, index) => ( 
      <div key={index} className="dynamic-div"> 
       {div} 
      </div>  
      ))} 
    </div> */}
    <div>
     {Array.isArray(divs) && divs.map((div, index) => (
      <div key={index} className="dynamic-div">
       {div}
      </div>
      ))}
    </div>
    <div className = 'additem'>
      <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button>
    </div>
    {openModal && <Modal closeModal = {setOpenModal}/>}
    </>
    
  )
}
