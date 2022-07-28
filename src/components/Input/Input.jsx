import { Button, FormControl, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import instance from "../../axios/instance";
import Style from "./Input.module.scss";
const Input = ({ value, setValue, todos, setTodos, setSnack }) => {
  // Update the input value
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Add Function
  const handleSubmit = async () => {
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: value, status: false, checked: false };

    if (value) {
      setTodos([...todos, newItem]);
      setValue("");
      instance.post("/posts", newItem);
      setSnack({ show: true, message: "Update Successfully !" });
    }
    if (!value) {
      setSnack({
        show: true,
        message: "Input must not be empty",
        status: "warning",
      });
    }
  };

  const input = (
    <FormControl className={Style.formControl}>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        placeholder="Add New Todo Item"
      />
    </FormControl>
  );

  const button = (
    <Stack spacing={2} direction="row">
      <Button variant="contained" className="btn" onClick={handleSubmit}>
        Add Task
      </Button>
    </Stack>
  );

  return (
    <Stack
      className={Style.inputContainer}
      sx={{
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      {input}

      {button}
    </Stack>
  );
};

export default Input;
