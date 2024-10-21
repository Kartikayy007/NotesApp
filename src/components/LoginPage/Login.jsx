import React, { useState } from 'react';
import Styles from './Login.module.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting to log in with:', { email, password });
      const response = await axios.post('https://notes-backend-x9sp.onrender.com/user/login', {
        email,
        password
      }, { withCredentials: true });
      console.log('Full API response:', response);
      console.log('API response data:', response.data);
      console.log('API response sessionId:', response.data.sessionId);
      if (response.data && response.data.sessionId) {
        localStorage.setItem('sessionId', response.data.sessionId);
        console.log('Session ID:', response.data.sessionId);
        window.location.href = '/home';
      } else if (response.data && response.data.error) {
        setError(response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.log('Errorv login:', err);
    }
  };

  return (
    <div className={Styles['login-container']}>
      <h1>Login</h1>
      {error && <div className={Styles['error-message']}>{error}</div>}
      <form onSubmit={handleLogin} className={Styles['login-form']}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={Styles['login-input']}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={Styles['login-input']}
        />
        <button type="submit" className={Styles['login-btn']}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;