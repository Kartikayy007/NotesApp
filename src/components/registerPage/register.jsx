import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import axios from 'axios';

const RegisterPage = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      axios.post("https://notes-backend-x9sp.onrender.com/user/signup", formData)
        .then((response) => {
          console.log('Response:', response.data);
          if (response.data.sessionId) {
            localStorage.setItem('sessionId', response.data.sessionId);
            console.log('Session ID:', response.data.sessionId);
            onRegistrationSuccess();
            navigate('/login'); 
          }
          console.log('Form submitted:', formData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('All fields are required');
      setError('All fields are required');
    }
  };

  return (
    <div className={Styles['registration-container']}>
      <h2>Register</h2>
      {error && <div className={Styles['error-message']}>{error}</div>}
      <form onSubmit={handleSubmit} className={Styles['registration-form']}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className={Styles['register-btn']}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;