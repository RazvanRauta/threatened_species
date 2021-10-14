import { Toolbar, Typography } from '@mui/material'
import { Theme } from '@mui/material/styles'

const Header = () => {
  return (
    <>
      <Toolbar
        sx={{
          padding: (theme: Theme) => theme.spacing(3, 2),
          justifyContent: 'space-between',
          background: (theme: Theme) => theme.palette.primary.main,
        }}
      >
        <Typography variant='h5' align='center' color='white' noWrap>
          Red List of Threatened Species
        </Typography>
      </Toolbar>
    </>
  )
}

export default Header
