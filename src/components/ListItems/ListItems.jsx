import {
  Button,
  Checkbox,
  Input,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import "./ListItems.scss";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";

import React from "react";

const ListItems = ({
  todo,
  handleDelete,
  handleCheck,
  handleEdit,
  handleCancle,
  updateValue,
  setUpdateValue,
  handleUpdate,
}) => {
  console.log("ListItems Render");

  return (
    <ListItem
      className="list-item"
      sx={{ bgcolor: "background.paper", gap: 3 }}
    >
      <ListItemIcon className="flex-center">
        <Checkbox
          checked={todo.checked}
          onChange={() => handleCheck(todo.id)}
          size="medium"
          edge="start"
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>

      {todo.status && (
        <Input
          onChange={(e) => setUpdateValue(e.target.value)}
          value={updateValue}
          sx={{ padding: "2px", flexGrow: 1 }}
        />
      )}
      {!todo.status && (
        <ListItemText
          sx={{ textDecoration: todo.checked ? "line-through" : "none" }}
          primary={`${todo.text} `}
        />
      )}

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {todo.status ? (
          <>
            <Button
              onClick={() => handleUpdate(todo.id)}
              variant="contained"
              color="success"
            >
              <Save />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCancle(todo.id)}
            >
              <Cancel />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleEdit(todo.id)}
              variant="contained"
              color="primary"
            >
              <Edit />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(todo.id)}
            >
              <Delete />
            </Button>
          </>
        )}
      </Stack>
    </ListItem>
  );
};

export default ListItems;
