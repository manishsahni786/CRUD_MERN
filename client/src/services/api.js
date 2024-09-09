// /services/api.js
import axios from 'axios';

const createExercise_API = process.env.REACT_APP_CREATE_EXERCISE;
const createUser_API = process.env.REACT_APP_CREATE_USER;
const login_API = process.env.REACT_APP_LOGIN_PAGE;
const signup_API = process.env.REACT_APP_SIGNUP_PAGE;
const user_API = process.env.REACT_APP_USERS;

export const createExercise = async (exerciseData) => {
  try {
    const response = await axios.post(createExercise_API, exerciseData);
    return response.data;
  } catch (error) {
    console.error('Error creating exercise:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(createUser_API, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(login_API, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(signup_API, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
export const fetchUsers = async () => {
  try {
    const response = await axios.get(user_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUser = async (formData) => {
  try {
    const response = await axios.post(`${user_API}/add`, formData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (id, formData) => {
  try {
    const response = await axios.put(`${user_API}/update/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${user_API}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};  
 
