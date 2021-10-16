/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import { Container } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

const Main: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  const noPadding = new RegExp(/species/).test(pathname)
  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        marginTop: (theme: Theme) => theme.spacing(noPadding ? 0 : 4),
        marginBottom: (theme: Theme) => theme.spacing(2),
      }}
    >
      <>{children}</>
    </Container>
  )
}

export default Main
