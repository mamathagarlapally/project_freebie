import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Modal from './Modal';
import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  //const [divs, setDivs] = useState([]);
  //const [divds, setDivds] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [slidedirection, setSlidedirection] = useState('');
  //const {addDatatext, setDatatext} = useContext(DataContext);
  const { addDatatext } = useContext(DataContext);
  const { data } = useContext(DataContext);
  const itemsPerPage = 2
  const { datatext } = useContext(DataContext);
  const [myItems, setMyItems] = useState([]);
  const [draftItems, setDraftItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);


  useEffect(()=>{
    const fetchlikeditems = async()=>{
      try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/likeditems', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setLikedItems(res.data);
      } catch(err){
        console.error('failed to fetch liked items', err);
      }
    };
    fetchlikeditems();
  },[]);

  useEffect(() => {
    const fetchMyitems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/myitems', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMyItems(res.data);
      } catch (err) {
        console.error("failed to fetch items", err);
      }
    };
    fetchMyitems();
  }, []);

  useEffect(() => {
    // Clean up any old preview URLs when component unmounts or data changes
    return () => {
      datatext.forEach(item => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
      // divds.forEach(item => {
      //   if (item.preview) URL.revokeObjectURL(item.preview);
      // });
    };
  }, [datatext]);

  useEffect(()=>{
     const fetchitems = async()=>{
      try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/draftitems',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDraftItems(res.data);
      } catch(err){
        console.error("error in fetching drafted items", err);
      }
     };
     fetchitems();
  }, []);

  const handleHide = async (id) => {
    try {
      const item = myItems.find(i => i.item_id === id);
      if (!item) return;

      const newHidden = item.hidden ? 0 : 1;

      await axios.post('http://localhost:5000/api/handlehide', {
        id: id,
        hidden: newHidden
      });
      setMyItems(prev =>
        prev.map(i =>
          i.item_id === id ? { ...i, hidden: newHidden } : i
        )
      );
    } catch (err) {
      console.error("Failed to update hidden state:", err);
    }
  };
  // const CreateDiv =(data)=>{
  //    setDivs((prevDivs) => [...prevDivs, {id: prevDivs.length+1, description : data.description, contactno: data.contactno }])
  //    //console.log(data.description, data.contactno);
  // };
  // const CreateDivd = (data) => {
  //   setDivds([...divds, {
  //     id: divds.length + 1, description: data.description, contactno: data.contactno, photo: data.photo,
  //     preview: data.preview
  //   }])
  // };
  const handleUpload = async(id, desc, cont) => {
    console.log(desc, cont);
    //const ddata = { description: desc, contactno: cont };
    //setDivds((prevDivds) => prevDivds.filter((divd) => divd.id !== id));
    //CreateDiv(ddata);
    addDatatext(data);
    try{
      await axios.post('http://localhost:5000/api/uploaddraft',{
        id: id
      });
    }catch(err){
      console.error("Error in uploading the drafts", err);
    }

  };
  const handleDeleteupload = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/handledeleteupload', {
        id: id
      });
    } catch (err) {
      console.error("Failed to delete item:", err);
    }

  }
  const handleDelete = async(id) => {
    //setDivds((prevDivds) => prevDivds.filter((divd) => divd.id !== id));
    try{
      await axios.post('http://localhost:5000/api/draftdelete', {
        id:id
      });
    } catch(err){
      console.error("failed to delete drafted items:", err);
    }
  };
  const handleIconslide = () => {
    console.log("Button clicked: Slide forward");

    setSlidedirection('left');
    setAnimate(true);

    setTimeout(() => {
      setVisibleIndex((prevIndex) => {
        const maxIndex = Math.max(0, myItems.length - itemsPerPage);
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
      <Navbar />
      <div className={openModal ? 'blurred' : ''}>
        <div><h2>MySpace</h2></div>

        <div className='tags'> My Uploads</div>
        <br></br>
        <button className="slide-icon">View All <FontAwesomeIcon icon={faGreaterThan} /></button>
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
        <div id="container">
          {myItems.slice(visibleIndex, visibleIndex + itemsPerPage).map((div) => (
            <div key={div.item_id} className={animate ? (slidedirection === 'right' ? 'div-animate-right' : "div-animate-left") : ''}><div className='content'>
              <div className='photo' >
                <img
                  src={`http://localhost:5000/api/image/${div.item_id}`} // Use your new image route
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                />


              </div>
              <div className="text">

                <div className="text-info">
                  <p>{div.description}</p>
                  <p>{div.contactno}</p>
                </div>


                <div className="text-likes">
                  <button className="like-button">
                    <FontAwesomeIcon className="white-heart" icon={faHeart} />
                  </button>
                  <span className="like-count">{div.like_count}</span>
                </div>

                <div className="text-actions">
                  <button onClick={() => handleDeleteupload(div.item_id)} className="delete">Delete</button>
                  <button onClick={() => handleHide(div.item_id)} className="delete">
                    {div.hidden ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>

            </div>
            </div>
          ))}
        </div>
        <div >
          <button className='add-item' onClick={() => { setOpenModal(true); }}><b>Add Item</b></button>
        </div>
        <div className='tags'>  My Drafts</div><br></br>
        <div id="container">
          {draftItems.map((divd) => (
            <div key={divd.item_id} className='cont-data'><div className="content">
              <div className='photo' >
                 <img
                  src={`http://localhost:5000/api/images/${divd.item_id}`} // Use your new image route
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                />

              </div>
              <div className='text'>
                <div className='uname'>{divd.contact_no}</div>
                <div className='desc'>{divd.description}</div>
                <br></br>
                <button onClick={() => handleUpload(divd.item_id, divd.description, divd.contactno,)} className="upload-button">Upload
                </button>
                <button onClick={() => handleDelete(divd.item_id)} className='delete'>Delete</button>
              </div>
            </div></div>
          ))}
        </div>
        <div className='tags'>My Likes</div><br></br>
             <div id="container">
          {likedItems.map((divd) => (
            <div key={divd.item_id} className='cont-data'><div className="content">
              <div className='photo' >
                 <img
                  src={`http://localhost:5000/api/imagesliked/${divd.item_id}`} // Use your new image route
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
                />

              </div>
              <div className='text'>
                <div className='uname'>{divd.contact_no}</div>
                <div className='desc'>{divd.description}</div>
                <br></br>
              </div>
            </div></div>
          ))}
        </div>
        </div>
      {openModal && <Modal closeModal={setOpenModal} />}
    </>
  )
}
