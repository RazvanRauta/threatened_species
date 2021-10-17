/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { forwardRef } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant='filled'
      data-testid='snack-bar-alert'
      {...props}
    />
  )
})

export default Alert
