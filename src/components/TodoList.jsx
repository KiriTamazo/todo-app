import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import instance from "../axios/instance";
import useAxios from "../axios/useAxios";
import Loading from "./loading/Loading";
import Header from "./Header/Header";
import Lists, { MemorizedList } from "./Lists/Lists";
import Snack from "./Snack/Snack";
import Switch from "./Switch/Switch";
import Input from "./Input/Input";

const TodoList1 = ({ darkMode, setDarkMode }) => {
  const [state] = useAxios({
    axiosInstance: instance,
    method: "get",
    url: "/posts",
  });

  const { data, loading, error } = state;

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    status: "",
  });
  console.log("TodoList Render");

  return (
    <Container
      component="section"
      sx={{
        position: "relative",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Header title="Todo List App" />
      {/* Input Bar */}
      <Input
        value={value}
        setValue={setValue}
        todos={todos}
        setTodos={setTodos}
        snack={snack}
        setSnack={setSnack}
      />
      {/* Todo Items List */}
      {loading && <Loading />}

      <MemorizedList
        todos={todos}
        setTodos={setTodos}
        loading={loading}
        snack={snack}
        setSnack={setSnack}
      />

      <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
      {snack.show && (
        <Snack color="success" snack={snack} setSnack={setSnack} />
      )}
    </Container>
  );
};

export default TodoList1;
