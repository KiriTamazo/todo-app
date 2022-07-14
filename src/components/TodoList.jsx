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

const TodoList = () => {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("items")) ||
      [
        // { id: 1, text: "Hello! My Frinds" },
        // { id: 2, text: "Hello! My Dear Frinds" },
        // { id: 3, text: "Hello! My Frinds" },
        // { id: 4, text: "Hello! My Dear Frinds" },
        // { id: 5, text: "Hello! My Frinds" },
        // { id: 6, text: "Hello! My Dear Frinds" },
        // { id: 7, text: "Hello! My Frinds" },
        // { id: 8, text: "Hello! My Dear Frinds" },
        // { id: 9, text: "Hello! My Frinds" },
        // { id: 10, text: "Hello! My Dear Frinds" },
        // { id: 11, text: "Hello! My Frinds" },
        // { id: 12, text: "Hello! My Dear Frinds" },
      ]
  );

  const [value, setValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id, text: value };
    if (value) {
      setTodos([...todos, newItem]);
      localStorage.setItem("items", JSON.stringify(todos));
      setValue("");
    }
  };

  const handleDelete = (id) => {
    const items = todos.filter((todo) => todo.id !== id);
    localStorage.removeItem("items", JSON.stringify(items));
    setTodos([...items]);
  };
  const handleEdit = (id) => {
    setShow(true);
    const item = todos.find((todo) => todo.id !== id);
    setUpdateValue({ id, text: item.text });
    console.log(updateValue);
  };
  const handleUpdate = () => {
    const item = todos.filter((todo) => todo.id === updateValue.id);
    console.log(item);
  };
  const handleCancle = () => {
    setShow(false);
    console.log("Click");
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <Container
      component="section"
      sx={{
        // backgroundColor: "#eeeeee87",
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
        {show ? (
          <>
            <FormControl sx={{ flexGrow: 1 }}>
              <OutlinedInput
                onChange={(e) => setUpdateValue({ title: e.target.value })}
                value={value}
                placeholder="Add New Todo Item"
              />
            </FormControl>
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="success"
                className="btn"
              >
                Update
              </Button>
              <Button
                onClick={handleCancle}
                variant="contained"
                color="error"
                className="btn"
              >
                Cancle
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <FormControl sx={{ flexGrow: 1 }}>
              <OutlinedInput
                value={value}
                onChange={handleChange}
                placeholder="Add New Todo Item"
              />
            </FormControl>

            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                className="btn"
                onClick={handleSubmit}
              >
                Add Task
              </Button>
            </Stack>
          </>
        )}
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
                show={show}
                handleCancle={handleCancle}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
        </List>
      </Stack>
    </Container>
  );
};

export default TodoList;
