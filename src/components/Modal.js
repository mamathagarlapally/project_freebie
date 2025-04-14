import React from 'react'
import {useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';


export default function Modal({closeModal, CreateDiv, CreateDivd}) {
  //const navigate = useNavigate();
  // const [data, setData] = useState({
  //   description: '', contactno: '' , optionval: '', count: 0
  // });
  const {addDatatext} = useContext(DataContext);
  const {setData} = useContext(DataContext);
  const {data} = useContext(DataContext);
  const handleChange =(e) =>{
    const {name, value} = e.target;
    setData((prevData) => ({ 
      ...prevData, 
      [name]: value}));
  };
  const handleSubmit = (event) => { 
   event.preventDefault(); 
     CreateDiv(data);
     addDatatext(data);
     closeModal(false);
  }; 
  const handleadddraft = (event)=>{
    event.preventDefault(); 
    console.log('Form Data:', data);
    CreateDivd(data);
    //addDatatext(data);
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
