/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 18:10
 */

import Alert from '../Alert'
import MuiSnackbar from '@mui/material/Snackbar'
import React from 'react'

interface SnackbarProps {
  severity: 'error' | 'warning' | 'info' | 'success'
  open: boolean
  message: string
  setOpen: (val: boolean) => void
}
const Snackbar = ({ open, severity, message, setOpen }: SnackbarProps) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
