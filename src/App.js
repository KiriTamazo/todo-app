import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(Boolean(JSON.parse(localStorage.getItem("darkMode"))));
  }, []);
  console.log(darkMode);
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
