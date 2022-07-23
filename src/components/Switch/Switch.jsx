import React, { useContext } from "react";
import { TodoContext } from "../../TodoProvider/TodoProvider";
import MuiSwitch from "./MuiSwitch";

const Switch = ({ darkMode, setDarkMode }) => {
  return (
    <MuiSwitch
      sx={{ position: "absolute", top: "20px", right: "30px" }}
      checked={!darkMode}
      onChange={() => setDarkMode(!darkMode)}
    >
      Dark Mode
    </MuiSwitch>
  );
};

export default Switch;
