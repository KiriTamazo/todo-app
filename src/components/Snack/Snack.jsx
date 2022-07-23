import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../../TodoProvider/TodoProvider";

const Snack = () => {
  const { snack, setSnack } = useContext(TodoContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack({
      ...snack,
      show: false,
    });
  };
  return (
    <Snackbar
      autoHideDuration={6000}
      open={snack.show}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        severity={snack.status}
        sx={{ width: "100%", alignItems: "center" }}
      >
        {snack.message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
