import React,{useState} from 'react';
import DataContext from './DataContext';

const DataContextProvider = ({children})=>{
   const [datatext, setDatatext] = useState([]);
   const addDatatext = (data) => {
    setDatatext((prevDatatext) => [...prevDatatext, data]); // Append new div data
  };
   return(
     <DataContext.Provider value = {{datatext , addDatatext}}>{children}</DataContext.Provider>
   )
};

export default DataContextProvider;