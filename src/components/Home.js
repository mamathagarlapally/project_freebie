import React from 'react';
//import MySpace from './MySpace';
import {useState} from 'react';
import Navbar from './Navbar';
//import Modal from './Modal'; 
import Maincomponent from './Maincomponent';

export default function Home() {
  
  const items = [
    { type: 'Apron', title: 'Apron Title', description: 'Apron Description' },
    { type: 'Books', title: 'Book Title', description: 'Book Description' },
    { type: 'Calci', title: 'Calci Title', description: ' Description' },
    { type: 'qp', title: 'qp Title', description: ' Description' },
    { type: 'Drafter', title: 'drafter Title', description: ' Description' },
    { type: 'other', title: ' Title', description: ' Description' }
   ];
   const initialSelectedItem = items.find(item => item.type === 'Apron');
   const [selected, setSelected] = useState(initialSelectedItem);
       const handleItemClick = (type) => {
        const item = items.find(i => i.type === type);
        setSelected(item);
       };
      
    
  return (
    <>
    <Navbar></Navbar>
    <div > 
         <div className = "buttons">
          <button className = "Apron" onClick={()=>handleItemClick('Apron')}><b>Apron</b></button>
          <button className = "Books" onClick = {()=>handleItemClick('Books')}><b>Books</b></button>
          <button className = "Calci" onClick = {()=>handleItemClick('Calci')}><b>Calci</b></button>
          <button className = "qp" onClick = {()=>handleItemClick('qp')}><b>Question Paper</b></button>
          <button className = "Drafter" onClick = {()=>handleItemClick('Drafter')}><b>Drafter</b></button>
          <button className = "other" onClick = {()=>handleItemClick('other')}><b>Other</b></button>
          {selected && <Maincomponent  item = {selected}/>}  
         </div>
      </div>
         {/* {openModal && (
      <Modal closeModal={() => setOpenModal(false)} /> 
    )} */}
    </>
  )
}
