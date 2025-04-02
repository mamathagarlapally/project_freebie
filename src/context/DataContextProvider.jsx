import React,{useState} from 'react';
import DataContext from './DataContext';

const DataContextProvider = ({children})=>{
   const [datatext, setDatatext] = useState([]);
   const addDatatext = (data) => {
    setDatatext((prevDatatext) => [...prevDatatext, data]); // Append new div data
  };
  const [valueset, setValueset] = useState('null');
   return(
     <DataContext.Provider value = {{datatext , addDatatext,valueset, setValueset}}>{children}</DataContext.Provider>
   )
};

export default DataContextProvider;