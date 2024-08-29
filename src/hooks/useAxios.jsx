import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  axios.defaults.baseURL = 'http://10.10.102.48:8080/api/';

  axios.defaults.headers.common['Content-Type'] = 'application/json';

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios({
        url,
        method,
        data: body,
        headers,
      });

      console.log(result)

      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      console.log(err)
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
