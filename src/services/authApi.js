import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUserByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      email: email
    }
  });

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);

  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      username: username
    }
  });

  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);

  return response.data;
};