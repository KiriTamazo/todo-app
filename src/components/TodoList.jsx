import {
  Box,
  Button,
  Stack,
  Container,
  FormControl,
  List,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListItems from "./ListItems";
import MuiSwitch from "./MuiSwitch";

const TodoList = ({ darkMode, setDarkMode }) => {
  
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [value, setValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: value, status: false };
    if (value) {
      setTodos([...todos, newItem]);
      localStorage.setItem("items", JSON.stringify(todos));
      setValue("");
    }
    console.log(newItem);
  };

  const handleDelete = (id) => {
    const items = todos.filter((todo) => todo.id !== id);
    localStorage.removeItem("items", JSON.stringify(items));
    setTodos([...items]);
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

  const handleUpdate = (id) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, text: updateValue, status: false }
        : todo;
    });
    setTodos(updateItem);
    localStorage.setItem("items", JSON.stringify(updateItem));
  };

  const handleCancle = (id) => {
    const updateItem = todos.map((todo) =>
      todo.id === id ? { ...todo, status: false } : todo
    );
    setTodos(updateItem);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

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
          {todos?.map((todo, index) => {
            return (
              <ListItems
                key={index}
                todo={todo}
                updateValue={updateValue}
                setUpdateValue={setUpdateValue}
                handleChange={handleChange}
                handleCancle={handleCancle}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </List>
      </Stack>

      <MuiSwitch
        sx={{ position: "absolute", top: "8%", right: "1%" }}
        checked={!darkMode}
        onChange={() => setDarkMode(!darkMode)}
      >
        Dark Mode
      </MuiSwitch>
    </Container>
  );
};

export default TodoList;
