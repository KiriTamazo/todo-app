import {
  Button,
  Checkbox,
  Collapse,
  Input,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  styled,
} from "@mui/material";
import Style from "./ListItems.module.scss";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
// import { motion } from "framer-motion";

import React from "react";

const ListsItems = styled(ListItem)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === "dark"
      ? "rgba(161, 161, 161, 14%) 0px 7px 4px 1px"
      : "rgb(0 0 0 / 14%) 0px 7px 4px 1px",
}));
const item = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
};

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
  return (
    <ListsItems
      className={`${Style.listItem} ${Style.flexCenter}`}
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <ListItemIcon className={Style.flexCenter}>
        <Checkbox
          checked={todo.checked}
          onChange={() => handleCheck(todo.id)}
          size="medium"
          edge="start"
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>

      {todo.status === true && (
        <Input
          onChange={(e) => setUpdateValue(e.target.value)}
          value={updateValue}
          sx={{ padding: "2px", flexGrow: 1 }}
        />
      )}
      {todo.status === false && (
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
    </ListsItems>
  );
};

export default ListItems;
