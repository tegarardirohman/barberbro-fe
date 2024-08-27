import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    console.log("test")

    try {
      const result = await axios({
        url,
        method,
        data: body,
        headers,
      });

      setResponse(result.data);
    } catch (err) {
      setError(err);
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
