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
export const sendLoginRequest = async ( {email, password} ) => {
  // debugger
  try {
    const dataToSend = JSON.stringify({
      email: email,
      password: password,
    });

    const response = await axios.post(
      `${BASE_URL}/users/login`,
      dataToSend,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    console.error("There was an error during user login process", error.response.data)
    throw error;
  }
};

export const sendLogoutRequest = async ( {token} ) => {
  // debugger
  try {
     await axios.post(`${BASE_URL}/users/logout`, null, {
      headers: {
        Authorization: token,
      },
    });

  } catch (error) {
    console.error("There was an error during user logout process", error.response.data)
    throw error;
  }
};

// Змінити функцію createContact на відправку даних на сервер
export const createContact = async (contact, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/contacts`, contact, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};


export const sendGetContactsRequest = async (token) => {
  try {
    debugger
    const response = await axios.get(`${BASE_URL}/contacts`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting contacts:', error);
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

export const deleteContact = async (id, token) => {
  try {
    await axios.delete(`https://connections-api.herokuapp.com/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }

};
