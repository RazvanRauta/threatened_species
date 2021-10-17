/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import { Link, Typography } from '@mui/material'

const Copyright = () => {
  return (
    <Typography variant='body2' color='white'>
      {'Copyright © '}
      <Link color='inherit' href='https://rrazvan.dev' target='_blank'>
        RRazvan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
