import {
  Button,
  Checkbox,
  Input,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
} from "@mui/material";
import Style from "./ListItems.module.scss";
import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { TodoContext } from "../../TodoProvider/TodoProvider";

const ListsItems = styled(motion.li)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#0f172a" : "#f8fafc",
  gap: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all .5s ",
  boxShadow:
    theme.palette.mode === "dark"
      ? "rgb(161 161 161 / 14%) 4px 5px 11px 2px"
      : "rgb(0 0 0 / 14%) 4px 5px 11px 2px",
}));

const ListItems = ({ todo, animation, index }) => {
  const {
    handleDelete,
    handleCheck,
    handleEdit,
    handleCancle,
    updateValue,
    setUpdateValue,
    handleUpdate,
    loading,
  } = useContext(TodoContext);

  return (
    <ListsItems
      custom={index}
      // initial={{ opacity: 0 }}
      animate={animation}
      className={`${Style.listItem} ${Style.flexCenter}`}
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
          sx={{
            padding: "2px",
            flexGrow: 1,
          }}
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
