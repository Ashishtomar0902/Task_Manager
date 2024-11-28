import React,{ useState,useEffect } from 'react'
import Cards from '../components/Home/Cards'
import axios from "axios"

const PendingTask = () => {
  const [Data, setData] = useState(); 

  useEffect(() => {
    const headers = { id: localStorage.getItem('id') };
    
    const fetch = async () => {
      const response = await axios.get('http://localhost:1000/api/v2/get-incomplete-tasks', { headers });
        setData(response.data.data); 
    };
    fetch();
  }); 
  return <div><Cards home={false} data={Data}/> </div>
}

export default PendingTask

