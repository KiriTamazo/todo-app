import React, { createContext, useEffect, useState } from "react";
import instance from "../axios/instance";
import useAxios from "../axios/useAxios";

export const TodoContext = createContext({});

const TodoProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    status: "",
  });

  const [state] = useAxios({
    axiosInstance: instance,
    method: "get",
    url: "/posts",
  });

  const { data, loading, error } = state;
  useEffect(() => {
    setTodos(data);
  }, [data]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // Add Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: value, status: false };

    if (value) {
      setTodos([...todos, newItem]);
      setValue("");
    }
    instance.post("/posts", newItem);
  };

  // Delete Function
  const handleDelete = async (id) => {
    const items = todos.filter((todo) => todo.id !== id);
    setTodos(items);
    await instance.delete(`/posts/${id}`);
    setSnack({
      show: true,
      message: "Delete Successful !",
      status: "error",
    });
  };
  // Edit Function
  const handleEdit = (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, status: true }
        : { ...todo, status: false };
    });
    setUpdateValue(todos.find((todo) => todo.id === id).text);
    setTodos(updateItem);
  };

  // Update Function
  const handleUpdate = async (id) => {
    if (updateValue) {
      const updateItem = todos.map((todo) => {
        return todo.id === id
          ? { ...todo, text: updateValue, status: false }
          : todo;
      });
      setTodos(updateItem);
      const items = updateItem.find((item) => item.id === id);
      await instance.put(`/posts/${id}`, items);
      setSnack({ show: true, message: "Update Successfully !" });
    } else {
      setSnack({
        show: true,
        message: "Input must not be empty",
        status: "warning",
      });
    }
  };

  const handleCancle = (id) => {
    const updateItem = todos.map((todo) =>
      todo.id === id ? { ...todo, status: false } : todo
    );

    setTodos(updateItem);
    setSnack({
      show: true,
      message: "Operation Cancel !",
      status: "error",
    });
  };

  // Checkbox Functions
  const handleCheck = async (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
    });
    setTodos(updateItem);
    const items = updateItem.find((item) => item.id === id);
    await instance.put(`/posts/${id}`, items);
  };

  // Animation

  return (
    <TodoContext.Provider
      value={{
        loading,
        todos,
        setTodos,
        value,
        setValue,
        snack,
        setSnack,
        handleDelete,
        handleCheck,
        handleEdit,
        handleCancle,
        updateValue,
        setUpdateValue,
        handleUpdate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
