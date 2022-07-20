import {
  Box,
  Button,
  Stack,
  Container,
  FormControl,
  List,
  OutlinedInput,
  Typography,
  ListItem,
  styled,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItems from "../ListItems/ListItems";
import MuiSwitch from "../Switch/MuiSwitch";
import instance from "../../axios/instance";
import useAxios from "../../axios/useAxios";
import Loading from "../loading/Loading";
import { motion } from "framer-motion";
import Style from "./TodoList.module.scss";
import Snack from "../Snack/Snack";
// Animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};
// const Lists = styled(motion.ul)(() => ({
//   width: "100%",
//   overflowY: "scroll",
//   maxHeight: "600px",
//   padding: "10px 0",
// }));
const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
// Api fetch Function
const TodoList = ({ darkMode, setDarkMode }) => {
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
  const [updateValue, setUpdateValue] = useState("");
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    status: "",
  });

  const updateTodos = todos.slice().reverse();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // Add Function
  const handleSubmit = async () => {
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
      status: "warning",
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

  return (
    <Container component="section" className={Style.sectionContainer}>
      <Box>
        <Typography variant="h5" textAlign="center">
          Todo List App
        </Typography>
      </Box>
      {/* Input Bar */}
      <Stack
        sx={{
          flexDirection: { sm: "column", md: "row" },
          gap: "20px",
          marginTop: "30px",
        }}
        justifyContent="space-between"
      >
        <FormControl sx={{ flexGrow: 1 }}>
          <OutlinedInput
            value={value}
            onChange={handleChange}
            placeholder="Add New Todo Item"
          />
        </FormControl>

        <Stack spacing={2} direction="row">
          <Button variant="contained" className="btn" onClick={handleSubmit}>
            Add Task
          </Button>
        </Stack>
      </Stack>
      {/* Todo Items List */}

      <Stack my={4} direction="row" spacing={3}>
        <List className={Style.list}>
          {loading && (
            <>
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
          {!todos && todos.length === 0 && !loading && (
            <ListItem>No List Item</ListItem>
          )}
          {!loading &&
            updateTodos?.map((todo, index) => {
              return (
                <ListItems
                  key={index}
                  todo={todo}
                  updateValue={updateValue}
                  setUpdateValue={setUpdateValue}
                  handleCancle={handleCancle}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleCheck={handleCheck}
                  handleUpdate={handleUpdate}
                />
              );
            })}
        </List>
      </Stack>

      <MuiSwitch
        sx={{ position: "absolute", top: "20px", right: "20px" }}
        checked={!darkMode}
        onChange={() => setDarkMode(!darkMode)}
      >
        Dark Mode
      </MuiSwitch>

      {snack.show && (
        <Snack snack={snack} setSnack={setSnack} color="success" />
      )}
    </Container>
  );
};

export default TodoList;
