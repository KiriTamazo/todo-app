import { Box, Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  const loadings = [1, 2, 3];

  return (
    <Box sx={{ padding: "0 15px" }}>
      {loadings.map((item) => (
        <Skeleton
          key={item}
          width="100%"
          sx={{
            minHeight: { xs: "120px", md: "80px" },
            alignItems: "unset",
          }}
        />
      ))}
    </Box>
  );
};

export default Loading;
