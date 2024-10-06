// src/services/userService.js

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Function to fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

// Function to fetch a single user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user by ID:', error);
  }
};

// Function to create a new user
export const createUser = async (user) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
  }
};

// Function to update an existing user by ID
export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};

// Function to delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return await response.json();
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
