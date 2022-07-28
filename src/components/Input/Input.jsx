import { Button, FormControl, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import instance from "../../axios/instance";

const Input = ({ value, setValue, todos, setTodos, snack, setSnack }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
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
  return (
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
  );
};

export default Input;
