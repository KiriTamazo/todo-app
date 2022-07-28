import { List, ListItem, Stack } from "@mui/material";
import React, { useState } from "react";
import instance from "../../axios/instance";
import ListItems from "../ListItems/ListItems";

const Lists = ({ todos, loading, setTodos, snack, setSnack }) => {
  const [checked, setChecked] = useState(false);
  const [updateValue, setUpdateValue] = useState("");

  const updateTodos = todos.slice().reverse();
  console.log("Lists Render");
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
      status: "error",
    });
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
    <Stack my={4} direction="row" spacing={3}>
      <List
        sx={{
          width: "100%",
          overflowY: "scroll",
          maxHeight: "600px",
          padding: "10px 0",
        }}
      >
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
                handleCancle={handleCancle}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleCheck={handleCheck}
                handleUpdate={handleUpdate}
              />
            );
          })}
        {!todos && todos.length === 0 && !loading && (
          <ListItem>No List Item</ListItem>
        )}
      </List>
    </Stack>
  );
};

export const MemorizedList = React.memo(Lists);
