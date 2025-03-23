import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Register a new user
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/signup`, userData);
};

// Login user
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/login`, userData);
};

// Fetch user portfolio
export const getPortfolio = async (userId) => {
  return await axios.get(`${API_URL}/portfolio/${userId}`);
};

// Create a new portfolio entry
export const createPortfolio = async (portfolioData) => {
  return await axios.post(`${API_URL}/portfolio`, portfolioData);
};

// Update portfolio entry
export const updatePortfolio = async (portfolioId, portfolioData) => {
  return await axios.put(`${API_URL}/portfolio/${portfolioId}`, portfolioData);
};

// Delete portfolio entry
export const deletePortfolio = async (portfolioId) => {
  return await axios.delete(`${API_URL}/portfolio/${portfolioId}`);
};
