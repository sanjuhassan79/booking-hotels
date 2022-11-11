import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setdata] = useState([]);
  const [loaading, setloaading] = useState(false);
  const [error, seterror] = useState(false);
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      setloaading(true);

      try {
        const res = await axios.get(url);
        setdata(res?.data?.data);
      } catch (err) {
        seterror(err);
      }
      setloaading(false);
    };
    fetchData();
  }, []);
  const refetch = async () => {
    setloaading(true);

    try {
      const res = await axios.get(url);
      setdata(res?.data?.data);
    } catch (err) {
      seterror(err);
    }
    setloaading(false);
  };
  return { data, loaading, error, refetch };
};

export default useFetch;
