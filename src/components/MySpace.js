import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  const [divs, setDivs] = useState([]);
  const CreateDiv =()=>{
    setDivs([...divs, {id: divs.length+1}])
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
        <div className='text'>mamathagarlapally
          <br></br>
          It is a apron , it contains sphn logo on it, it a second hand thing,
          bought in 2022 november
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
    <div className='tags'>My Likes</div><br></br>
     {openModal && <Modal closeModal = {setOpenModal} CreateDiv={CreateDiv} />}
    </>

  )
}
