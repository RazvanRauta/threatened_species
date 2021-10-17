/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 13:50
 */

import { Box, CircularProgress } from '@mui/material'

import React from 'react'

const Loader = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1))
    }

    const timer = setInterval(tick, 20)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box display='flex' width={500} maxWidth={'100%'} height={'60vh'} m='auto'>
      <Box m='auto'>
        <CircularProgress
          variant='determinate'
          value={progress}
          color='secondary'
        />
      </Box>
    </Box>
  )
}

export default Loader
