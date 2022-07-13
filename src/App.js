import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

import { useState } from "react";
import TodoList from "./components/TodoList";
import MuiSwitch from "./components/MuiSwitch";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6366f1",
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6366f1",
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <Paper
        className="container"
        component="main"
        sx={{
          borderRadius: 0,
          padding: { xs: "20px 16px", md: "20px 24px" },
          transition: "all .4s linear",
        }}
      >
        <TodoList />
        <MuiSwitch
          sx={{ position: "absolute", top: "3%", right: "1%" }}
          checked={!darkMode}
          onChange={() => setDarkMode(!darkMode)}
        >
          Dark Mode
        </MuiSwitch>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
