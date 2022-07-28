import React from "react";
import MuiSwitch from "./MuiSwitch";

const Switch = ({ darkMode, setDarkMode }) => {
  return (
    <MuiSwitch
      sx={{ position: "absolute", top: "20px", right: "20px" }}
      checked={!darkMode}
      onChange={() => setDarkMode(!darkMode)}
    >
      Dark Mode
    </MuiSwitch>
  );
};

export default Switch;
