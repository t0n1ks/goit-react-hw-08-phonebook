import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/auth/authSlice';
import axios from 'axios';
import styles from './LoginPage.module/LoginPage.module.css'; 

function LoginPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('https://connections-api.herokuapp.com/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;

      dispatch(login({ token }));

      setFormData({ email: '', password: '' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
