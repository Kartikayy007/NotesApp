import React, { useState } from 'react';
import Styles from './Login.module.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://notes-backend-x9sp.onrender.com/user/login', {
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem('sessionid', response.data.data.sessionId);    
        console.log('Session ID:', response.data.data.sessionId);    
        window.location.href = '/notes';
      } 
      else {
        setError('Login failed: No token received');
      }
    } 
    
    catch (err) {
      console.error('Error during login:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Invalid credentials');
      } else if (err.request) {
        setError('Network error. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={Styles['login-input']}
          required
        />
        <button type="submit" className={Styles['login-btn']}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;