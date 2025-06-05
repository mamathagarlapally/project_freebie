import React from 'react'
import axios from 'axios'
import {useContext,useRef,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';
import { jwtDecode } from 'jwt-decode'; 



export default function Modal({closeModal, CreateDiv, CreateDivd}) {
  //const navigate = useNavigate();
  // const [data, setData] = useState({
  //   description: '', contactno: '' , optionval: '', count: 0
  // });
  const {addDatatext} = useContext(DataContext);
  const {setData} = useContext(DataContext);
  const {data} = useContext(DataContext);
  const [clicked, setClicked] = useState(false);
  

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click(); // Programma
    // tically click hidden input
    
  };

  const handleFileChange = (e) => {
    console.log('File input changed');
    const file = e.target.files[0];
    console.log('Selected file:', file);
    const previewUrl = URL.createObjectURL(file);
    setClicked(true);

  setData((prevData) => ({
    ...prevData,
    photo: file,
    preview: previewUrl // <-- store preview here directly
  }));
    // You can now upload the file using FormData, etc.
  };

  
  const handleChange =(e) =>{
    const {name, value} = e.target;
    setData((prevData) => ({ 
      ...prevData, 
      [name]: value}));
  };
  const handleSubmit = async(event) => { 
   event.preventDefault(); 
     //CreateDiv(data);
     addDatatext(data);
     closeModal(false);
     const uname = jwtDecode(localStorage.getItem("token")).username;
    const formData = new FormData();
    formData.append('item_id', data.id);
    formData.append('option_val', data.optionval);
    formData.append('description', data.description);
    formData.append('contact_no', data.contactno);
    formData.append('like_count', data.count);
    formData.append("uname", uname);
    formData.append('photo', data.photo); 
    try{
        await axios.post('http://localhost:5000/api/Modal', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
          }
        });
    }
    catch(err){
      console.log(err);
    }
  }; 
  const handleadddraft = async(event)=>{
    event.preventDefault(); 
    console.log(data);
    CreateDivd(data);
    //addDatatext(data);
    console.log(data);
    closeModal(false);
     const uname = jwtDecode(localStorage.getItem("token")).username;
    const formData = new FormData();
    formData.append('item_id', data.id);
    formData.append('option_val', data.optionval);
    formData.append('description', data.description);
    formData.append('contact_no', data.contactno);
    formData.append("uname", uname);
    formData.append('photo', data.photo); 
    try{
        await axios.post('http://localhost:5000/api/addingdraft', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
          }
        });
    }
    catch(err){
      console.log(err);
    }
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
        <button className='Upload'  type = 'button' onClick={handleClick}>{clicked? 'Uploaded' : 'upload'}</button>
        <input type = "file" ref = {fileInputRef} onChange={handleFileChange} style={{display: 'none'}} accept = "image/*"></input>
        <br></br>
        <label>What are you uploading?
           <select name= "optionval" onChange={handleChange}>
            <option value = {null}></option> 
            <option value="Apron">Apron</option>
            <option value="Books">Books</option>
            <option value="Calci">Calci</option>
            <option value="qp">Question papers</option>
            <option value="Drafter">Drafter</option>
            <option value="other">Other</option>
           </select>
        </label>
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
