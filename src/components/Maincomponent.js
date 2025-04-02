import React, { useContext } from 'react';
//import {useState} from 'react';
import DataContext from '../context/DataContext';



export default function Maincomponent({item}) {
  //const [divs, setDivs] = useState([]);
  const { datatext } = useContext(DataContext);
  const filteredItems = datatext.filter(div => div.optionval === item.type);
  //const {valueset} = useContext(DataContext);
  //const filteredDivs = datatext.filter(div => div.type === valueset);
  return (
    <>
    <div><h1>{item.title}</h1>
    <h2>{item.description}</h2>
    <h3>{item.valueset}</h3>
    <div id = "component">
      {filteredItems.map((div)=>(
        <div key={div.id} className={`cont-data ${div.id % 2 === 0 ? 'even': 'odd'}`}><div className = "content">
        <div className='photo' ></div> 
        <div className='text'> 
           <div className = 'uname'>{div.contactno}</div>
           <div className='desc'>{div.description}</div>
          <br></br>
        </div>
      </div></div>
      ))}
    </div> 
    </div> 
    </>
  );
};