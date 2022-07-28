import { ListItem, Skeleton } from "@mui/material";
import React from "react";
const initialLoading = [1, 2, 3];

const Loading = () => {
  return (
    <>
      {initialLoading.map((loading, index) => (
        <ListItem
          key={index}
          disableGutters
          sx={{
            minHeight: { xs: "120px", md: "80px" },
            alignItems: "unset",
          }}
        >
          <Skeleton width="100%" />
        </ListItem>
      ))}
    </>
  );
};

export default Loading;
