import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const NetworkErrorModal = ({ open, onClose, errorMSG }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Network Error</DialogTitle>
      <DialogContent>
        
        <p>There was an error connecting to the compiler endpoint</p>
        <Typography>{errorMSG}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NetworkErrorModal;
