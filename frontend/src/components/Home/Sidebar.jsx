import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdOutlineLabelImportant, MdOutlinePendingActions } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [Data, setData] = useState();

  const data = [
    {
      title: "Task List",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: 'Priority Tasks',
      icon: <MdOutlineLabelImportant />,
      link: "/priorityTask",
    },
    {
      title: "Completed Tasks",
      icon: <BiCheckDouble />,
      link: "/completedTask",
    },
    {
      title: "Pending Tasks",
      icon: <MdOutlinePendingActions />,
      link: "/pendingTask",
    },
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/login");
  };

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
      {Data && (
        <div>
          <h2 className='text-xl font-bold'>{Data.username}</h2>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className='my-2 flex items-center hover:bg-gray-800 p-2 rounded transition-all duration-400'>
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-500 w-full p-2 rounded' onClick={logout}>Log Out</button>
      </div>
    </>
  );
};

export default Sidebar;
