import { ListItem } from "@mui/material";
import { styled } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import uuid from "react-uuid";
import { TodoContext } from "../../TodoProvider/TodoProvider";
import ListItems from "../ListItems/ListItems";
import Style from "./Lists.module.scss";

const Lists = () => {
  const { todos, loading } = useContext(TodoContext);

  const ListsItem = styled(motion.ul)(() => ({
    width: "100%",
    overflowY: "scroll",
    maxHeight: "600px",
    padding: "10px 15px",
  }));
  

  const updateTodos = todos.slice().reverse();
  return (
    <ListsItem className={Style.list}>
      <AnimatePresence>
        {!loading &&
          updateTodos?.map((todo, index) => {
            return <ListItems todo={todo} key={uuid()} loading={loading} />;
          })}
      </AnimatePresence>
      {!todos && todos.length === 0 && !loading && (
        <ListItem>No List Item</ListItem>
      )}
    </ListsItem>
  );
};

export default Lists;
