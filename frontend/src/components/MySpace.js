import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';

export default function MySpace() {
  const [openModal, setOpenModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const itemsPerPage = 2;

  const { addDatatext, data, datatext } = useContext(DataContext);

  const [myItems, setMyItems] = useState([]);
  const [draftItems, setDraftItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [draftsVisibleIndex, setDraftsVisibleIndex] = useState(0);
  const [likesVisibleIndex, setLikesVisibleIndex] = useState(0);
  const [likeduser, setLikeduser] = useState();

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch profile");
          }
          return res.json();  
        })
        .then((data) => {
          setLikeduser(data.username); 
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, []);
  
  
  
  const handleSlide = (direction, index, setIndex, items) => {
    setSlideDirection(direction);
    setAnimate(true);

    setTimeout(() => {
      if (direction === 'right' && index + itemsPerPage < items.length) {
        setIndex(index + 1);
      } else if (direction === 'left' && index > 0) {
        setIndex(index - 1);
      }
      setAnimate(false);
    }, 100);
  };

  // fetch liked items (depends on likeduser)
useEffect(() => {
  if (!likeduser) return;
  console.log("likeduser", likeduser);
  const fetchLiked = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("http://localhost:5000/api/likeditems", {
        headers: { Authorization: `Bearer ${token}` },
        params: { username: likeduser }
      });
      setLikedItems(res.data);
    } catch (err) {
      console.error("Failed to fetch liked items", err);
    }
  };
  fetchLiked();
}, [likeduser]);

// fetch my items + drafts (run once, independent of likeduser)
useEffect(() => {
  const fetchOtherData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res1 = await axios.get("http://localhost:5000/api/myitems", { headers: { Authorization: `Bearer ${token}` } });
      setMyItems(res1.data);

      const res2 = await axios.get("http://localhost:5000/api/draftitems", { headers: { Authorization: `Bearer ${token}` } });
      setDraftItems(res2.data);
    } catch (err) {
      console.error("Failed to fetch my items or drafts", err);
    }
  };
  fetchOtherData();
}, []);

  useEffect(() => {
    return () => {
      datatext.forEach(item => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, [datatext]);

  const handleHide = async (id) => {
    try {
      const item = myItems.find(i => i.item_id === id);
      if (!item) return;
      const newHidden = item.hidden ? 0 : 1;

      await axios.post('http://localhost:5000/api/handlehide', { id, hidden: newHidden });
      setMyItems(prev =>
        prev.map(i => (i.item_id === id ? { ...i, hidden: newHidden } : i))
      );
    } catch (err) {
      console.error("Failed to update hidden state:", err);
    }
  };

  const handleUpload = async (id, desc, cont) => {
    addDatatext(data);
    try {
      await axios.post('http://localhost:5000/api/uploaddraft', { id });
    } catch (err) {
      console.error("Error in uploading the drafts", err);
    }
  };

  const handleDeleteupload = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/handledeleteupload', { id });
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/draftdelete', { id });
    } catch (err) {
      console.error("failed to delete drafted items:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={openModal ? 'blurred' : ''}>
        <h2>MySpace</h2>

        {/* ---------------- My Uploads ---------------- */}
        <div className='tags'>My Uploads</div>
        <div className='sliding-container'>
          {myItems.length > 0 && (
            <>
              <button onClick={() => handleSlide('right', visibleIndex, setVisibleIndex, myItems)} className='iconslide'>
                <FontAwesomeIcon className="icon" icon={faGreaterThan} />
              </button>
              <button onClick={() => handleSlide('left', visibleIndex, setVisibleIndex, myItems)} className='iconslide2'>
                <FontAwesomeIcon className="icon" icon={faLessThan} />
              </button>
            </>
          )}
        </div>

        <div id="containers">
          {myItems.slice(visibleIndex, visibleIndex + itemsPerPage).map((div) => (
            <div key={div.item_id} className={animate ? (slideDirection === 'right' ? 'div-animate-right' : 'div-animate-left') : ''}>
              <div className="contents">
                <div className='photos'>
                  <img src={`http://localhost:5000/api/image/${div.item_id}`} alt="Uploaded" />
                </div>
                <div className="texts">
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

        <button className='add-item' onClick={() => setOpenModal(true)}><b>Add Item</b></button>

        {/* ---------------- My Drafts ---------------- */}
        <div className='tags'>My Drafts</div>
        <div className="sliding-container">
          {draftItems.length > 0 && (
            <>
              <button onClick={() => handleSlide('right', draftsVisibleIndex, setDraftsVisibleIndex, draftItems)} className='iconslide'>
                <FontAwesomeIcon className="icon" icon={faGreaterThan} />
              </button>
              <button onClick={() => handleSlide('left', draftsVisibleIndex, setDraftsVisibleIndex, draftItems)} className='iconslide2'>
                <FontAwesomeIcon className="icon" icon={faLessThan} />
              </button>
            </>
          )}
        </div>

        <div id="containers">
          {draftItems.slice(draftsVisibleIndex, draftsVisibleIndex + itemsPerPage).map((divd) => (
            <div key={divd.item_id} className="contents">
              <div className='photos'>
                <img src={`http://localhost:5000/api/images/${divd.item_id}`} alt="Uploaded" />
              </div>
              <div className='texts'>
                <div className='unames'>{divd.contact_no}</div>
                <div className='desc'>{divd.description}</div>
                <div className='buttons'>
                  <button onClick={() => handleUpload(divd.item_id, divd.description, divd.contactno)} className="upload-button">Upload</button>
                  <button onClick={() => handleDelete(divd.item_id)} className='delete'>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- My Likes ---------------- */}
        <div className='tags'>My Likes</div>
        <div className="sliding-container">
          {likedItems.length > 0 && (
            <>
              <button onClick={() => handleSlide('right', likesVisibleIndex, setLikesVisibleIndex, likedItems)} className='iconslide'>
                <FontAwesomeIcon className="icon" icon={faGreaterThan} />
              </button>
              <button onClick={() => handleSlide('left', likesVisibleIndex, setLikesVisibleIndex, likedItems)} className='iconslide2'>
                <FontAwesomeIcon className="icon" icon={faLessThan} />
              </button>
            </>
          )}
        </div>

        <div id="containers">
          {likedItems.slice(likesVisibleIndex, likesVisibleIndex + itemsPerPage).map((divd) => (
            <div key={divd.item_id} className="contents">
              <div className='photos'>
                <img src={`http://localhost:5000/api/imagesliked/${divd.item_id}`} alt="Uploaded" />
              </div>
              <div className='texts'>
                <div className='unames'>{divd.contact_no}</div>
                <div className='desc'>{divd.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openModal && <Modal closeModal={setOpenModal} />}
    </>
  );
}





