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
  handleEdit,
  handleCancle,
  updateValue,
  setUpdateValue,
  handleChange,
  handleUpdate,
}) => {
  return (
    <ListItem
      className="list-item"
      sx={{ bgcolor: "background.paper", gap: 3 }}
    >
      
      <ListItemIcon className="flex-center">
        <Checkbox size="medium" edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>

      {todo.status === true && (
        <Input
          onChange={(e) => setUpdateValue(e.target.value)}
          value={updateValue}
          sx={{ padding: "2px", flexGrow: 1 }}
        />
      )}
      {todo.status === false && <ListItemText primary={`${todo.text} `} />}

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        {todo.status === true ? (
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
