import axios from 'axios';

const BASE_URL = 'https://connections-api.herokuapp.com'; 

// Функція для реєстрації користувача
export const signup = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Функція для автентифікації користувача
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Змінити функцію createContact на відправку даних на сервер
export const createContact = async (contact) => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteContact = async (contactId) => {
  try {
    await axios.delete(`${BASE_URL}/contacts/${contactId}`);
  } catch (error) {
    throw error.response.data;
  }
};
