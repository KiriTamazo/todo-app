import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

import { useState } from "react";
import TodoList from "./components/TodoList";
import MuiSwitch from "./components/MuiSwitch";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
      primary: {
        main: "#6366f1",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        className="container"
        component="main"
        sx={{
          borderRadius: 0,
          padding: { xs: "20px 16px", md: "20px 24px" },
          transition: "all .4s linear",
        }}
      >
        <TodoList darkMode={darkMode} setDarkMode={setDarkMode} />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
