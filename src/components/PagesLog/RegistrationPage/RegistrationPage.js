import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {sendRegisterRequest } from 'api/api';
import 'react-toastify/dist/ReactToastify.css';


import styles from './RegistrationPage.module/RegistrationPage.module.css';
import { register } from 'redux/auth/authSlice';

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
    // debugger
    if (isAuthenticated && !error) {
      navigate('/user-menu');
    }
  },[isAuthenticated, error, navigate]);
  
  const handleSubmit = async e => {
    debugger
    e.preventDefault();

    try {
      const response = await sendRegisterRequest({name: formData.name, email: formData.email, password: formData.password}); 
      dispatch(register({token: response.token, user: response.user}));
    

     
      navigate('/user-menu');
      setTimeout(() => {
        toast.success('User successfully registered');
      }, 500);

    } catch (error) {
      if(error.response.status === 400 && error.response.data.name === "MongoError") {
        toast.error('User already exist')
        return;
      }
      else {
        toast.error('Registration failed', error);
    }
    }
  };

  return (
    <div className={styles.container}> 
      <h2 className={styles.heading}>Registration</h2>
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
