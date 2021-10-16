/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

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
          '@media screen and (max-width: 600px)': {
            padding: (theme: Theme) => theme.spacing(1),
          },
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
            '@media screen and (max-width: 600px)': {
              fontSize: '20px',
            },
          }}
        >
          Red List of Threatened Species
        </Typography>
      </Toolbar>
    </>
  )
}

export default Header
