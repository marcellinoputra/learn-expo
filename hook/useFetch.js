import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': `3be2d3e7bamsh9e81d3c7378b806p111237jsna707fd4926da`,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  async function fetchData() {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function refetch() {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}
