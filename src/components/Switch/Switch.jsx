import React, { useCallback } from "react";
import MuiSwitch from "./MuiSwitch";

const Switch = ({ darkMode, setDarkMode }) => {
  
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <MuiSwitch
      sx={{ position: "absolute", top: "20px", right: "20px" }}
      checked={!darkMode}
      onChange={handleDarkMode}
    >
      Dark Mode
    </MuiSwitch>
  );
};

export default Switch;
