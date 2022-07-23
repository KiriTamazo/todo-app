import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { error, loading, success } from "../redux/dataSlicer";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        dispatch(success(res.data));
      } catch (err) {
        dispatch(error(err.message));
      } finally {
        dispatch(loading());
      }
    };
    fetchData();
    return () => controller.abort();
  }, [axiosInstance, method, url]);
  return [data];
};
export default useAxios;
