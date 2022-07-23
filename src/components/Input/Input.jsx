import { Button, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import instance from "../../axios/instance";
import { TodoContext } from "../../TodoProvider/TodoProvider";
import Style from "./Input.module.scss";

const Input = () => {
  const { value, setValue, todos, setTodos } = useContext(TodoContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // Add Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = todos.length > 1 ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: value, status: false };

    if (value) {
      setTodos([...todos, newItem]);
      setValue("");
    }
    instance.post("/posts", newItem);
  };

  return (
    <Box
      component="form"
      className={Style.form}
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <OutlinedInput
        sx={{ flexGrow: 1 }}
        value={value}
        onChange={handleChange}
        placeholder="Add New Todo Item"
      />

      <Button
        type="submit"
        variant="contained"
        className={Style.btn}
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default Input;
