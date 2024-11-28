import React, { useState, useEffect } from 'react'
import Cards from '../components/Home/Cards'
import { IoMdAddCircle } from "react-icons/io"
import InputData from '../components/Home/InputData'
import axios from 'axios'

const TaskList = () => {
  const [InputDiv, setInputDiv] = useState("hidden")
  const [Data, setData] = useState();

  const[UpdatedData, setUpdateData] = useState({id:"",title:"",desc:""})

  useEffect(() => {
    const headers = { id: localStorage.getItem('id') };
    const fetch = async () => {
    const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
      setData(response.data.data);
    };
    if(localStorage.getItem("id"))
    {
      fetch()
    }
  });
  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
          </button>
        </div>
        {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdateData={setUpdateData} />}
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdateData={setUpdateData}/>
    </>
  )
}

export default TaskList
