import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user?.token}`;
  }

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    setLoading(true);
    setError(null);  
    setResponse(null);

    try {
      const result = await axios({
        url,
        method,
        data: body,
        headers,
      });

      console.log('Response:', result);

      setResponse(result.data);
      return result.data;
    } catch (err) {
      console.log('Error:', err);
      setError(err.response?.data || err.message);
      return err?.response; 
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    request,
  };
};

export default useAxios;
