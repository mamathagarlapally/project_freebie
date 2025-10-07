import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DataContext from '../context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

export default function Search() {
  const [publicItems, setPublicItems] = useState([]);
  const [email, setEmail] = useState('');
  const [contno, setContno] = useState('');
  const [likeduser, setLikeduser] = useState('');
  const { uname } = useContext(DataContext); 

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        setLikeduser(data.username);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      });
  }, []);

  
  useEffect(() => {
    const fetchPublicItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/publicItems');
        setPublicItems(res.data);
      } catch (err) {
        console.error('Failed to fetch public items:', err);
      }
    };
    fetchPublicItems();
  }, []);

  
  const filteredItems = publicItems.filter((item) =>
    uname ? item.uname.toLowerCase().includes(uname.toLowerCase()) : false
  );

  
  useEffect(() => {
    const fetchContactInfo = async () => {
      if (!uname) return;
      try {
        const res = await axios.get('http://localhost:5000/fetchcontinfo', {
          params: { username: uname },
        });
        setContno(res.data);
      } catch (err) {
        console.error('Error fetching contact info:', err);
      }
    };
    fetchContactInfo();
  }, [uname]);

  
  useEffect(() => {
    const fetchEmail = async () => {
      if (!uname) return;
      try {
        const res = await axios.get('http://localhost:5000/fetchingemail', {
          params: { username: uname },
        });
        setEmail(res.data);
      } catch (err) {
        console.error('Error fetching email:', err);
      }
    };
    fetchEmail();
  }, [uname]);

  
  const handleOnClick = async (id) => {
    try {
      const insertRes = await axios.post('http://localhost:5000/api/storeliked', {
        id,
        username: likeduser,
      });

      if (insertRes.status === 200) {
        await axios.post('http://localhost:5000/api/updatelike', { id });
      }
    } catch (err) {
      console.error('Error while liking:', err);
    }
  };

  


  return (
    <>
      <Navbar />
      <div id="component">
        <h4 style={{ textAlign: 'center', marginTop: '15px' }}>
          Search Results for "{uname}"
        </h4>

        {filteredItems.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            No items found for "{uname}" 
          </p>
        ) : (
          filteredItems.map((div) => (
            <div key={div.item_id} className={`cont-data ${div.item_id % 2 === 0 ? 'even' : 'odd'}`}>
              {!div.hidden && (
                <div className="content">
                  <div className="photo">
                    <img
                      src={`http://localhost:5000/api/image/${div.item_id}`}
                      alt="Uploaded"
                      style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                    />
                  </div>

                  <div className="text">
                    <div className="u_name">
                      <div className="prof-pic">
                        <img
                          src={`http://localhost:5000/api/profimage/${div.uname}`}
                          alt=""
                          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      </div>
                      <p>
                        <span className="naming">{div.uname}</span>
                        <br />
                        {email}
                      </p>
                    </div>

                    <div className="desc">{div.description}</div>
                    <div className="contno">
                      Contact Number: {div.contactno || contno}
                    </div>
                    <br />
                    <button
                      onClick={() => handleOnClick(div.item_id)}
                      className="like-button"
                    >
                      <FontAwesomeIcon className="white-heart" icon={faHeart} />{' '}
                      {div.like_count}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
