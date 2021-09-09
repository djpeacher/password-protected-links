import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const LockedLinkDialog = ({ open, url, handleClose }) => {
  const link = `${window.location.origin}/unlock/${url}`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="locked-link"
      aria-describedby="locked-link-description"
    >
      <DialogTitle id="locked-link">
        <span role="img" aria-label="lock">
          🔒
        </span>
        Locked
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="locked-link-description" sx={{ overflowWrap: 'anywhere' }}>
          {link}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigator.clipboard.writeText(link)}>Copy</Button>
        <Button onClick={() => window.open(link, '_blank').focus()}>Open</Button>
        <Button onClick={handleClose}>Dismiss</Button>
      </DialogActions>
    </Dialog>
  );
};

LockedLinkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  url: PropTypes.string,
  handleClose: PropTypes.func.isRequired
};

export default LockedLinkDialog;
