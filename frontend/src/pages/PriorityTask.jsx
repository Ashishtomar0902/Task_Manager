import React, { useEffect, useState } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const PriorityTask = () => {
  const [Data, setData] = useState(); 

  useEffect(() => {
    const headers = { id: localStorage.getItem('id') };

    
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v2/get-priority-tasks', { headers });
        setData(response.data.data); 
      } catch (error) {
        console.error('Error fetching priority tasks:', error); 
      }
    };

    fetch();
  }); 

  return (
    <div>
      {Data ? ( 
        <Cards home={false} data={Data} /> 
      ) : (
        <p>Loading priority tasks...</p> 
      )}
    </div>
  );
};

export default PriorityTask;
