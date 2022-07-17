import { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducer/reducer";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res.data, state);
        dispatch({ type: "success", payload: res.data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };
    fetchData();
    return () => controller.abort();
  }, [axiosInstance, method, url]);

  return [state];
};
export default useAxios;
