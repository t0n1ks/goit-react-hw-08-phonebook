// LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom'; // Додано імпорт



import styles from './LoginPage.module/LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() =>  {
    if (isAuthenticated && !error) {
      navigate('/user-menu');
    }
  },[isAuthenticated, error, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async e => {
    // debugger
    e.preventDefault();

    try {   

      dispatch(login( {email: formData.email, password: formData.password} ));
    //   if (isAuthenticated && !error){
    //   navigate("/user-menu");
    // }
    } catch (error) {
      alert('Login failed:', error);
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
