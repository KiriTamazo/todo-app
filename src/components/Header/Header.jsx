import { Box, Typography } from "@mui/material";
import React from "react";

const Header = ({ title }) => {
  
  return (
    <Box>
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
