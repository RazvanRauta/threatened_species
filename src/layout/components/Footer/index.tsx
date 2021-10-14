import theme from '@/theme'
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
        background: theme.palette.primary.main,
      }}
    >
      <Container maxWidth='sm'>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
