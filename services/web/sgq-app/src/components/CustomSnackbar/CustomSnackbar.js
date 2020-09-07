import React from "react";
import PropTypes from "prop-types";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CustomSnackbar(props){

    const { severity, message, open, setOpen } = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

CustomSnackbar.propTypes = {
    severity: PropTypes.oneOf([
      "error",
      "warning",
      "info",
      "success",
    ]),
    message: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func
  };