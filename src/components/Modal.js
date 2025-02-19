import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//import { useNavigate } from 'react-router-dom';

export default function Modal({closeModal, CreateDiv, CreateDivd}) {
  //const navigate = useNavigate();
  const [data, setData] = useState({
    description: '', contactno: ''
  });
  const handleChange =(e) =>{
    const {name, value} = e.target;
    setData((prevData) => ({ 
      ...prevData, 
      [name]: value}));
  };
  const handleSubmit = (event) => { 
    event.preventDefault(); 
    console.log('Form Data:', data);
    CreateDiv();
    closeModal(false);
  }; 

  const handleadddraft = (event)=>{
    event.preventDefault(); 
    console.log('Form Data:', data);
    CreateDivd();
    closeModal(false);
  }
  
  return (
    <div className= 'ModalBackground'>
      <div className='ModalContainer'>
      <div className='close'>
        <h1 className='modal-name'>ADD ITEM</h1>
        <button className='close-modal' onClick={()=> {closeModal(false)}}><FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
       <form onSubmit = {handleSubmit} className='Modal-content'>
        <h4>Add Photo:</h4>
        <button className='Upload'>Upload</button>
        <h4>Add Description:</h4>
        <textarea className= 'description' name='description'   onChange= {handleChange}  type = 'text'></textarea>
        <h4>Contact No:</h4>
        <input type='
        tel' name = 'contactno'  onChange= {handleChange} placeholder='enter your contact number'></input><br></br><br></br>
        <button type = "submit" className='Add'>Add</button>
       </form><br></br>
       <button  onClick = {handleadddraft} className = "addtodraft">Save as Draft</button>
      </div>
    </div>
  )
}
