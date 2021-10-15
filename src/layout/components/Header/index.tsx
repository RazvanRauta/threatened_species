import { Toolbar, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  const handleReset = async () => {
    history.push('/')
  }
  return (
    <>
      <Toolbar
        sx={{
          padding: (theme: Theme) => theme.spacing(3, 2),
          justifyContent: 'space-between',
          background: (theme: Theme) => theme.palette.primary.main,
        }}
      >
        <Typography
          onClick={handleReset}
          variant='h5'
          align='center'
          color='white'
          noWrap
          sx={{
            cursor: 'pointer',
          }}
        >
          Red List of Threatened Species
        </Typography>
      </Toolbar>
    </>
  )
}

export default Header
