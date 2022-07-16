import { ListItem, Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <ListItem
      disableGutters
      sx={{
        minHeight: { xs: "120px", md: "80px" },
        alignItems: "unset",
      }}
    >
      <Skeleton width="100%" />
    </ListItem>
  );
};

export default Loading;
