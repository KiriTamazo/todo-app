import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    console.log(controller);
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res);
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [axiosInstance, method, url]);

  return [response, loading, error];
};
export default useAxios;
