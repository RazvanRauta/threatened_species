import { Container } from '@mui/material'
import { Theme } from '@mui/material/styles'

const Main: React.FC = ({ children }) => {
  return (
    <Container
      component='main'
      maxWidth='md'
      sx={{
        marginTop: (theme: Theme) => theme.spacing(8),
        marginBottom: (theme: Theme) => theme.spacing(2),
      }}
    >
      <>{children}</>
    </Container>
  )
}

export default Main
