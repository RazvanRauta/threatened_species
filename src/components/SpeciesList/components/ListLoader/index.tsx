/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:12
 */

import { Box, CircularProgress } from '@mui/material'

type ListLoaderProps = {
  style: React.CSSProperties
}

const ListLoader = ({ style }: ListLoaderProps) => (
  <div style={style}>
    <Box
      sx={{
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress size='50px' color='secondary' />
    </Box>
  </div>
)

export default ListLoader
