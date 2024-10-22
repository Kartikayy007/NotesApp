// api.js
import axios from 'axios';

const API_BASE_URL = 'https://notes-backend-x9sp.onrender.com';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for handling cookies/sessions
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(request => {
  console.log('📤 Outgoing Request:', {
    url: request.url,
    method: request.method,
    data: request.data
  });
  return request;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  response => {
    console.log('📥 Incoming Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  }, 
  error => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    throw error;
  }
);

export const getAllNotes = async () => {
  try {
    const response = await apiClient.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch note ${id}:`, error);
    throw error;
  }
};

export const addNote = async (noteData) => {
  try {
    const response = await apiClient.post('/notes', noteData);
    return response.data;
  } catch (error) {
    console.error('Failed to add note:', error);
    throw error;
  }
};

export const updateNoteById = async (id, updateData) => {
  try {
    const response = await apiClient.put(`/notes/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update note ${id}:`, error);
    throw error;
  }
};

export const deleteNoteById = async (id) => {
  try {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete note ${id}:`, error);
    throw error;
  }
};