import { Button, FormControl, OutlinedInput, Stack } from "@mui/material";
import React, { useRef } from "react";
import instance from "../../axios/instance";
import Style from "./Input.module.scss";
const Input = ({ value, setValue, todos, setTodos, setSnack }) => {
  const mainInputRef = useRef();
  // console.log(val);
  // Update the input value
  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  // Add Function
  const handleSubmit = async () => {
    let val = mainInputRef.current?.value;

    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newItem = { id: newId, text: val, status: false, checked: false };

    if (val) {
      setTodos([...todos, newItem]);
      setValue("");
      instance.post("/posts", newItem);
      mainInputRef.current.value = "";
      setSnack({ show: true, message: "Update Successfully !" });
    }
    if (!val) {
      setSnack({
        show: true,
        message: "Input must not be empty",
        status: "warning",
      });
    }
  };

  return (
    <Stack
      className={Style.inputContainer}
      sx={{
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      {/* Input */}
      <FormControl className={Style.formControl}>
        <OutlinedInput
          name="mainInput"
          id="mainInput"
          inputProps={{ ref: mainInputRef }}
          // value={mainInputRef.current?.value}
          // onChange={handleChange}
          placeholder="Add New Todo Item"
        />
      </FormControl>
      {/* Button */}
      <Stack spacing={2} direction="row">
        <Button variant="contained" className="btn" onClick={handleSubmit}>
          Add Task
        </Button>
      </Stack>
    </Stack>
  );
};

export default Input;
