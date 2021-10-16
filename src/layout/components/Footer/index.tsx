/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import { Container, Box } from '@mui/material'
import { Theme } from '@mui/material/styles'

import Copyright from '../Copyright'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        padding: (theme: Theme) => theme.spacing(3, 2),
        textAlign: 'center',
        marginTop: 'auto',
        background: (theme: Theme) => theme.palette.primary.main,
        '@media screen and (max-width: 600px)': {
          padding: (theme: Theme) => theme.spacing(1),
        },
      }}
    >
      <Container maxWidth='sm'>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
