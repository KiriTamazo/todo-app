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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItems from "./ListItems";
import MuiSwitch from "./MuiSwitch";
import instance from "../axios/instance";
import useAxios from "../axios/useAxios";
import Loading from "./loading/Loading";

// Animation

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
  const updateTodos = todos.slice().reverse();

  const [value, setValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: value, status: false };

    if (value) {
      setTodos([...todos, newItem]);
      setValue("");
    }
    instance.post("/posts", newItem);
  };

  const handleDelete = async (id) => {
    const items = todos.filter((todo) => todo.id !== id);
    setTodos(items);
    await instance.delete(`/posts/${id}`);
  };

  const handleEdit = (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, status: true }
        : { ...todo, status: false };
    });
    setUpdateValue(todos.find((todo) => todo.id === id).text);
    setTodos(updateItem);
  };

  const handleUpdate = async (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, text: updateValue, status: false }
        : todo;
    });
    setTodos(updateItem);
    const items = updateItem.find((item) => item.id === id);
    await instance.put(`/posts/${id}`, items);
  };

  const handleCancle = (id) => {
    const updateItem = todos.map((todo) =>
      todo.id === id ? { ...todo, status: false } : todo
    );

    setTodos(updateItem);
  };
  const handleCheck = async (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? { ...todo, checked: !todo.checked } : todo;
    });
    setTodos(updateItem);
    const items = updateItem.find((item) => item.id === id);
    await instance.put(`/posts/${id}`, items);
  };

  return (
    <Container
      component="section"
      sx={{
        position: "relative",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
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
        <List
          sx={{
            width: "100%",
            overflowY: "scroll",
            maxHeight: "600px",
            padding: "10px 0",
          }}
        >
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
                  checked={checked}
                  setChecked={setChecked}
                  updateValue={updateValue}
                  setUpdateValue={setUpdateValue}
                  handleChange={handleChange}
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
    </Container>
  );
};

export default TodoList1;
