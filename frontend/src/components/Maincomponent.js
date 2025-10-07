import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
//import DataContext from '../context/DataContext';
import { useEffect } from 'react';



export default function Maincomponent({item}) {
  const [publicItems, setPublicItems] = useState([]);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [contno, setContno] = useState();
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


  
  useEffect(()=>{
    const fetchcontactno = async()=>{
      if(!username) return;
      try{
        const res = await axios.get('http://localhost:5000/fetchcontinfo',{
          params : {username:username}
        });
        setContno(res.data);
      } catch(err){
        console.error(err);
      }
    }
    fetchcontactno();
  }, [username]);
  useEffect(()=>{
    const fetchPublicItems = async()=>{
      try{
        const res = await axios.get('http://localhost:5000/api/publicItems');
        setPublicItems(res.data); 
        setUsername(res.data[0]?.uname);
      }catch (err) {
        console.error("Failed to fetch public items:", err);
      }
    }
    fetchPublicItems();
  }, []);
   const filteredItems = publicItems.filter(i=> i.option_val === item.type);
  useEffect(()=>{
    return ()=>{
      filteredItems.forEach(item => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    }
  } ,[filteredItems]);

  // 
  const handleOnClick = async (id) => {
  try {
    // Step 1: Try inserting into liked_items
    const insertRes = await axios.post('http://localhost:5000/api/storeliked', {
      id: id,
      username: likeduser
    });

    // Step 2: If insert was successful, update like count
    if (insertRes.status === 200) {
      await axios.post('http://localhost:5000/api/updatelike', {
        id: id
      });
    }
  } catch (err) {
    console.error('Error while liking:', err);
  }
};

  
  useEffect(()=>{
    const fetchemail = async()=>{
      if (!username) return; 
      try{
        const res = await axios.get('http://localhost:5000/fetchingemail',{
          params : {username:username}
        });
        setEmail(res.data);
      } catch(err){
        console.error(err);
      }
    }
    fetchemail();
  },[username]);
 
  return (
    <>
    <div>
    <div id = "component">
      {filteredItems.map((div)=>(
        
        <div key={div.id} className={`cont-data ${div.id % 2 === 0 ? 'even': 'odd'}`}>
          {!div.hidden && (<div className = "content">
        <div className='photo' >
              <img
                 src={`http://localhost:5000/api/image/${div.item_id}`}
                 alt="Uploaded"
                 style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
          </div> 
            <div className='text'>
              <div className='u_name'><div className='prof-pic'><img
                src={`http://localhost:5000/api/profimage/${div.uname}`}
                alt=""
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              /></div><p><span className="naming">{div.uname}</span>
                  <br />
                  {email}</p></div> 
           <div className='desc'>{div.description}</div>
           <div className = 'contno'>Contact Number: {div.contactno || contno}
           </div>
          <br></br>
           <button onClick = {()=>handleOnClick(div.item_id)} className="like-button">
                    < FontAwesomeIcon className='white-heart' icon={faHeart} /> {div.like_count}
           </button>
        </div>
      </div>
          )}</div>
      ))}
    </div> 
    </div> 
    </>
  );
};