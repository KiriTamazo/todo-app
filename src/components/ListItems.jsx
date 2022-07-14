import {
  Button,
  Checkbox,
  Input,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
} from "@mui/material";
import "./ListItems.scss";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";

import React from "react";

const ListItems = ({ todo, handleDelete, handleEdit, handleCancle, show }) => {
  return (
    <ListItem
      className="list-item"
      sx={{ bgcolor: "background.paper", gap: 3 }}
    >
      <ListItemIcon className="flex-center">
        <Checkbox size="medium" edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>
      {show ? (
        <ListItemText primary={`${todo.text} `} />
      ) : (
        <Input
          defaultValue="Hello world"
          sx={{ padding: "2px", flexGrow: 1 }}
        />
      )}

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {show ? (
          <>
            <Button
              onClick={() => handleEdit(todo.id)}
              variant="contained"
              color="primary"
            >
              <Save />
            </Button>
            <Button variant="contained" color="error" onClick={handleCancle}>
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
