import React,{useState} from 'react';
import DataContext from './DataContext';

const DataContextProvider = ({children})=>{
  const [datatext, setDatatext] = useState([]);
  
  
  // const addDatatext = (data) => {
  //   setDatatext((prevDatatext) => [...prevDatatext, data]); // Append new div data
  // };
  const addDatatext = (data) => {
    const newItem = {
      ...data,
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      hidden: false,
    };
    setDatatext((prev) => [...prev, newItem]);
  };
  
  const [data, setData] = useState({
     id: Date.now(), photo: null, description: '', contactno: '' , optionval: '', count: 0
  });
   
  const [uname, setUname] = useState('');
   return(
     <DataContext.Provider value = {{datatext , setDatatext,addDatatext, data, setData, uname, setUname}}>{children}</DataContext.Provider>
   )
};

export default DataContextProvider;