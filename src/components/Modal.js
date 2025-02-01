import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Modal({closeModal}, {addDiv}) {
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
  }; // Print the form data to the console };
  
  return (
    <div className= 'ModalBackground'>
      <div className='ModalContainer'>
      <div className='close'>
        <button onClick={()=> {closeModal(false)}}><FontAwesomeIcon icon={faTimes} />
      </button>
      </div>
      <h1>ADD ITEM</h1>
      
       <form onSubmit = {handleSubmit} className='Modal-content'>
        <h4>Add Photo:</h4>
        <button className='Upload'>Upload</button>
        <h4>Add Description:</h4>
        <textarea className= 'description' name='description'   onChange= {handleChange}  type = 'text'></textarea>
        <h4>Contact No:</h4>
        <input type='tel' name = 'contactno'  onChange= {handleChange} placeholder='enter your contact number' required></input><br></br><br></br>
        <button   onClick = {addDiv} className='Add'>Add</button>
       </form>
      </div>
    </div>
  )
}
