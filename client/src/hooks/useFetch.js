import { useEffect, useState } from "react";
import axios from "axios";

const UseFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const baseURL = process.env.REACT_APP_API_URL
  //console.log(baseURL);

  useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(baseURL + url);
       localStorage.setItem("datas", JSON.stringify(res.data));
       const savedRes = JSON.parse(localStorage.getItem("datas"))
        setData(savedRes);



       // console.log(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default UseFetch;