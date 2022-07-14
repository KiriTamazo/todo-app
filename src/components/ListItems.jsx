import {
  Button,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import React from "react";

const ListItems = ({ todo, handleDelete, handleEdit }) => {
  return (
    <ListItem
      sx={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        bgcolor: "background.paper",
        borderRadius: "5px",
        minHeight: "80px",
        margin: "15px 0",
        padding: "20px",
        "&:first-of-type": {
          marginTop: "0",
        },
        "&:last-of-type": {
          marginBottom: "0",
        },
      }}
    >
      <ListItemIcon>
        <Checkbox edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`${todo.text} `} />

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        <Button onClick={handleEdit} variant="contained" color="primary">
          <Edit />
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(todo.id)}
        >
          <Delete />
        </Button>
      </Stack>
    </ListItem>
  );
};

export default ListItems;
