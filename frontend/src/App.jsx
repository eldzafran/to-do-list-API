import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import API from './api';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(token) fetchTasks();
  }, [token]);

  const handleLogin = (t) => setToken(t);
  const handleRegister = (t) => setToken(t);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register onRegister={handleRegister} />} />
        <Route path="/dashboard" element={token ? <Dashboard tasks={tasks} setTasks={setTasks} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
