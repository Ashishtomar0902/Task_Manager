import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import PriorityTask from './pages/PriorityTask';
import CompletedTask from './pages/CompletedTask';
import PendingTask from './pages/PendingTask';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const currentPath = window.location.pathname; 
    if (!isLoggedIn && currentPath !== '/signup') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<TaskList />} />
          <Route path="priorityTask" element={<PriorityTask />} />
          <Route path="completedTask" element={<CompletedTask />} />
          <Route path="pendingTask" element={<PendingTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
