import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
//import DataContext from '../context/DataContext';
import { useEffect } from 'react';



export default function Maincomponent({item}) {
  //const [divs, setDivs] = useState([]);
  //const { datatext, setDatatext } = useContext(DataContext);
  //const [counter, setCounter] = useState(0);
 
  const [publicItems, setPublicItems] = useState([]);

  useEffect(()=>{
    const fetchPublicItems = async()=>{
      try{
        const res = await axios.get('http://localhost:5000/api/publicItems');
        setPublicItems(res.data); 
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

  const storelikeitems = async(id)=>{
    try {
      await axios.post('http://localhost:5000/api/storeliked', {
        id: id
      });
    } catch(err){
      console.error('error in storing the liked items', err);
    }
  }

  const handleOnClick = async(id) => {
    console.log("id of the divs")
    console.log(id);
    try{
      await axios.post('http://localhost:5000/api/updatelike', {
        id:id
      });
    } catch(err){
      console.error('like updation failed:', err);
    }
    storelikeitems(id);
    // setDatatext((prevDatatext) =>
    //   prevDatatext.map((div) =>
    //     div.id === id ? { ...div, count: (div.count + 1) } : div
    //   )
    // );
  };
  
 
  return (
    <>
    <div>
    <div id = "component">
      {filteredItems.map((div)=>(
        
        <div key={div.id} className={`cont-data ${div.id % 2 === 0 ? 'even': 'odd'}`}>
          {!div.hidden && (<div className = "content">
        <div className='photo' >
              <img
                 src={`http://localhost:5000/api/image/${div.item_id}`} // Use your new image route
                 alt="Uploaded"
                 style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
          </div> 
        <div className='text'> 
           <div className = 'u_name'>profilephoto{div.uname}</div> 
           <div className='desc'>{div.description}</div>
           <div className = 'contno'>{div.contactno}
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