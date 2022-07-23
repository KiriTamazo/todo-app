import { Stack, Container } from "@mui/material";
import React, { useContext } from "react";
import Loading from "../loading/Loading";
import Style from "./TodoList.module.scss";
import Snack from "../Snack/Snack";
import Switch from "../Switch/Switch";
import Input from "../Input/Input";
import { TodoContext } from "../../TodoProvider/TodoProvider";
import Header from "../Header/Header";
import Lists from "../Lists/Lists";

// Api fetch Function
const TodoList = ({ darkMode, setDarkMode }) => {
  const { snack, loading } = useContext(TodoContext);

  // Animation

  return (
    <Container component="section" className={Style.sectionContainer}>
      <Header title="Todo List App" />

      {/* Input Bar */}

      <Input />

      {/* Loading */}

      {loading && <Loading />}

      {/* Todo Items List */}

      <Stack my={4} direction="column" spacing={3}>
        <Lists />
      </Stack>

      {/* Switch */}

      <Switch darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Snack */}

      {snack.show && <Snack color="success" />}
    </Container>
  );
};

export default TodoList;
