import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useStylesButtonPrimary } from "./ButtonPrimary.css";

const ButtonPrimary = ({ text, onClick }) => {
  const classes = useStylesButtonPrimary();

  return (
    <Button
      className={classes.button_primary}
      onClick={onClick}
      fullWidth
      color="secondary"
      variant="contained"
    >
      <Typography className={classes.button_text}>{text}</Typography>
    </Button>
  );
};

export default ButtonPrimary;
