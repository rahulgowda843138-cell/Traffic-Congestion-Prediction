import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('API Health check failed:', error);
    return { status: 'unavailable', service: 'Unknown', model: 'Unknown' };
  }
};

export const getOptions = async () => {
  try {
    const response = await api.get('/options');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch options:', error);
    throw error;
  }
};

export const getPrediction = async (data) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Prediction failed:', error);
    throw new Error(error.response?.data?.detail || 'Prediction failed. Please try again.');
  }
};

export const getRankedRoads = async (params) => {
  try {
    const response = await api.get('/roads/rank', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ranked roads:', error);
    throw error;
  }
};

export const getScenarios = async () => {
  try {
    const response = await api.get('/scenarios');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch scenarios:', error);
    return [];
  }
};
