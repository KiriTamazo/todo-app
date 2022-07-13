import {
  Box,
  Button,
  Container,
  FormControl,
  List,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ListItem from "./ListItem";

const TodoList = () => {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
    { id: 1, text: "Hello! My Frinds" },
    { id: 2, text: "Hello! My Dear Frinds" },
  ]);

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
        <FormControl sx={{ flexGrow: 1 }}>
          <OutlinedInput placeholder="Add New Todo Item" />
        </FormControl>
        <Stack spacing={2} direction="row">
          {show ? (
            <>
              <Button variant="contained" className="btn">
                Update
              </Button>
              <Button variant="contained" className="btn">
                Cancle
              </Button>
            </>
          ) : (
            <Button variant="contained" className="btn">
              Add Task
            </Button>
          )}
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
          {todos.map((todo, index) => {
            return <ListItem />;
          })}
        </List>
      </Stack>
    </Container>
  );
};

export default TodoList;
