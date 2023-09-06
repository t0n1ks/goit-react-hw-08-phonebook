import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/auth/authSlice';
import axios from 'axios';
import styles from './RegistrationPage.module/RegistrationPage.module.css';

function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(() =>  {
    if (isAuthenticated && !error) {
      navigate('/user-menu');
    }
  },[isAuthenticated, error, navigate]);
  
  const handleSubmit = async e => {
    debugger
    e.preventDefault();

    try {
      // Серіалізуємо дані у JSON формат
      const dataToSend = JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const response = await axios.post('https://connections-api.herokuapp.com/users/signup', dataToSend, {
        headers: {
          'Content-Type': 'application/json', // Вказуємо тип контенту JSON
        },
      });

      const { token } = response.data;

      dispatch(login({ token }));

      setFormData({ name: '', email: '', password: '' });

    } catch (error) {
      if(error.response.status === 400 && error.response.data.name === "MongoError") {
        alert ('User already exist')
      }
      else {
       alert ('Registration failed:', error);
    }
    }
  };

  return (
    <div className={styles.container}> {/* Додали клас зі стилями */}
      <h2 className={styles.heading}>Registration</h2> {/* Додали клас зі стилями */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
