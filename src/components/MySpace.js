import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  const [divs, setDivs] = useState([]);
  const [divds, setDivds] = useState([]);
  const CreateDiv =(data)=>{
    setDivs([...divs, {id: divs.length+1, description : data.description, contactno: data.contactno }])
    console.log(data.description, data.contactno);
  };
  const CreateDivd = (data) =>{
    setDivds([...divds, {id: divds.length + 1, description: data.description, contactno:data.contactno}])
  };
  const handleUpload=(id,desc, cont)=>{
    console.log(desc, cont);
    const ddata = { description: desc, contactno: cont };
    setDivds(divds.filter((divd) => divd.id !== id));
    CreateDiv(ddata);

  };
  

  return (
    <>
    <Navbar/>
    <div className={openModal ? 'blurred':''}>
    <div><h><b>MySpace</b></h></div>
    
    <div className='tags'> My Uploads</div>
    <br></br>
    <div id = "container">
      {divs.map((div)=>(
        <div key={div.id} className='cont-data'><div className = "content">
        <div className='photo' ></div> 
        <div className='text'>
          <br></br>
          {div.description}<br></br>{div.contactno}
          <button className="like-button">
          < FontAwesomeIcon className='white-heart' icon={faHeart} /> Like
          </button>
        </div>
      </div></div>
      ))}
    </div>    
    <div >
          <button className='add-item' onClick = {()=>{setOpenModal(true);}}><b>Add Item</b></button>
      </div>
    </div>
    <div className='tags'>  My Drafts</div><br></br>
    <div id = "container">
      {divds.map((divd)=>(
        <div key={divd.id} className='cont-data'><div className = "content">
        <div className='photo' ></div> 
        <div className='text'> 
           <div className = 'uname'>{divd.contactno}</div>
           <div className='desc'>{divd.description}</div>
          <br></br>
          <button onClick= {()=>handleUpload(divd.id, divd.description, divd.contactno)} className="upload-button">Upload
          </button>
        </div>
      </div></div>
      ))}
    </div>    
    <div className='tags'>My Likes</div><br></br>
     {openModal && <Modal closeModal = {setOpenModal} CreateDiv={CreateDiv} CreateDivd={CreateDivd} />}
    </>

  )
}
