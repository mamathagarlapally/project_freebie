import React, { useContext } from 'react';
//import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import DataContext from '../context/DataContext';



export default function Maincomponent({item}) {
  //const [divs, setDivs] = useState([]);
  const { datatext, setDatatext } = useContext(DataContext);
  //const [counter, setCounter] = useState(0);
  const filteredItems = datatext.filter(div => div.optionval === item.type);
  //const {setData} = useContext(DataContext);
  //const filteredDivs = datatext.filter(div => div.type === valueset);
  const handleOnClick = (id) => {
    console.log("id of the divs")
    console.log(id);
    setDatatext((prevDatatext) =>
      prevDatatext.map((div) =>
        div.id === id ? { ...div, count: (div.count + 1) } : div
      )
    );
  };
  
 
  return (
    <>
    <div>
    <div id = "component">
      {filteredItems.map((div)=>(
        
        <div key={div.id} className={`cont-data ${div.id % 2 === 0 ? 'even': 'odd'}`}>
          {!div.hidden && (<div className = "content">
        <div className='photo' ></div> 
        <div className='text'> 
           <div className = 'u_name'>mamatha_garlapally</div> 
           <div className='desc'>{div.description}</div>
           <div className = 'contno'>{div.contactno}
           </div>
          <br></br>
           <button onClick = {()=>handleOnClick(div.id)} className="like-button">
                    < FontAwesomeIcon className='white-heart' icon={faHeart} /> {div.count}
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