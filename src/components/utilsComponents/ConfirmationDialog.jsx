import {
  DialogActions,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({ title, body, handleOnAccept, handleOnCancel }) => {
  const [isOpen, setOpen] = useState(true);

  const onAccept = () => {
    handleOnAccept()
    setOpen(!isOpen);

  };

  const onCancel = () => {
    handleOnCancel()
    setOpen(!isOpen);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept}>ok</Button>
        <Button onClick={onCancel}>deny</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
