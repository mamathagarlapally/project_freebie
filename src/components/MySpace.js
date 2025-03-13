import React from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  const [divs, setDivs] = useState([]);
  const [divds, setDivds] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [slidedirection, setSlidedirection] = useState('');
  const itemsPerPage = 2  

  const CreateDiv =(data)=>{
    setDivs((prevDivs) => [...prevDivs, {id: prevDivs.length+1, description : data.description, contactno: data.contactno }])
    console.log(data.description, data.contactno);
  };
  const CreateDivd = (data) =>{
    setDivds([...divds, {id: divds.length + 1, description: data.description, contactno:data.contactno}])
  };
  const handleUpload=(id, desc, cont)=>{
    console.log(desc, cont);
    const ddata = { description: desc, contactno: cont };
    setDivds((prevDivds) => prevDivds.filter((divd) => divd.id !== id));
    CreateDiv(ddata);
  };
  const handleIconslide = () => {
    console.log("Button clicked: Slide forward");
  
    setSlidedirection('left');
    setAnimate(true);
  
    setTimeout(() => {
      setVisibleIndex((prevIndex) => {
        const maxIndex = Math.max(0, divs.length - itemsPerPage); 
        const newIndex = prevIndex + 1 > maxIndex ? maxIndex : prevIndex + 1;
        console.log(`New visibleIndex (forward): ${newIndex}`);
        return newIndex;
      });
      setAnimate(false);
    }, 100);
  };
  const handleIconslide2 = () => {
    console.log("Button clicked: Slide backward");
  
    setSlidedirection('right');
    setAnimate(true);
  
    setTimeout(() => {
      setVisibleIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        console.log(`New visibleIndex (backward): ${newIndex}`);
        return newIndex;
      });
      setAnimate(false);
    }, 100);
  };
  
  return (
    <>
    <Navbar/>
    <div className={openModal ? 'blurred':''}>
    <div><h><b>MySpace</b></h></div>
    
    <div className='tags'> My Uploads</div>
    <br></br>
    <button className = "slide-icon">View All <FontAwesomeIcon  icon={faGreaterThan} /></button>
    <button
          onClick={handleIconslide} 
          className='iconslide'
        >
        <FontAwesomeIcon className="icon" icon={faGreaterThan} />
        </button>
    <button
          onClick={handleIconslide2} 
          className='iconslide2'
        >
      <FontAwesomeIcon className="icon" icon={faLessThan} />
        </button>
    <div  id = "container">
    {divs.slice(visibleIndex, visibleIndex + itemsPerPage).map((div) => (
        <div key={div.id} className={animate ? (slidedirection === 'right' ? 'div-animate-right' : 'div-animate-left') : ''}><div className="content">
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
    <div className='tags'>My Likes</div><br></br></div>
     {openModal && <Modal closeModal = {setOpenModal} CreateDiv={CreateDiv} CreateDivd={CreateDivd}  />}
    </>
  )
}
