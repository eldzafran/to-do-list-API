import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await API.post('/login', { email, password });
      const token = res.data.data.token;
      setAuthToken(token);
      onLogin(token);

      navigate('/dashboard');
    } catch (err) {
      if(err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        alert('Login gagal, coba lagi yaaa');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <div style={{ color: 'red', fontSize: 12 }}>{errors.email.join(', ')}</div>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <div style={{ color: 'red', fontSize: 12 }}>{errors.password.join(', ')}</div>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
