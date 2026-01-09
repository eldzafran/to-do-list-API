import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import API, { setAuthToken } from './api';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 ambil token dari localStorage saat pertama load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
    setLoading(false);
  }, []);

  // fetch task setelah token ada
  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data.data ?? res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (t) => {
    setToken(t);
    setAuthToken(t);
  };

  const handleRegister = (t) => {
    setToken(t);
    setAuthToken(t);
  };

  const logout = () => {
    setToken(null);
    setAuthToken(null);
    setTasks([]);
  };

  if (loading) return <p>loading...</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? '/dashboard' : '/login'} />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <Register onRegister={handleRegister} />}
        />

        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard tasks={tasks} setTasks={setTasks} logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
