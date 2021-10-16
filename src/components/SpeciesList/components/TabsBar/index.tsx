/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:20
 */

import { Box, Typography, useMediaQuery } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

interface TabsBarProps {
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
  value: number
  currentRegion?: string
}

const TabsBar = ({ handleChange, value, currentRegion }: TabsBarProps) => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        paddingTop: '10px',
        borderBottom: 1,
        borderColor: 'divider',
        marginBottom: isMobile ? '10px' : 'unset',
      }}
    >
      {currentRegion && (
        <Typography
          variant='h5'
          sx={{
            position: isMobile ? 'relative' : 'absolute',
            right: isMobile ? 'unset' : 0,
            top: isMobile ? 'unset' : '18px',
            fontSize: isMobile ? '16px' : 'unset',
            py: isMobile ? '5px' : 'unset',
          }}
        >
          {currentRegion} Region
        </Typography>
      )}
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'
        aria-label='full width tabs'
        variant='scrollable'
      >
        <Tab label='All Species' {...a11yProps(0)} />
        <Tab label='Critical Endangered' {...a11yProps(0)} />
        <Tab label='Mammals' {...a11yProps(0)} />
      </Tabs>
    </Box>
  )
}

export default TabsBar
