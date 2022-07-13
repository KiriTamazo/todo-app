import {
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import React from "react";

const ListItem = () => {
  return (
    <ListItem
      sx={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        bgcolor: "background.paper",
        borderRadius: "5px",
        minHeight: "80px",
        margin: "15px 0",
        "&:first-child": {
          marginTop: "0",
        },
        "&:last-child": {
          marginBottom: "0",
        },
      }}
    >
      <ListItemIcon>
        <Checkbox edge="start" tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`Line item `} />

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "20px",
        }}
      >
        <Button variant="contained" color="primary">
          <Edit />
        </Button>
        <Button variant="contained" color="error">
          <Delete />
        </Button>
      </Stack>
    </ListItem>
  );
};

export default ListItem;
