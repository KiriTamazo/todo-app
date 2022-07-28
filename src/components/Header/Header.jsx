import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Header = ({title}) => {
  return (
    <Box>
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
