/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 23:11
 */

import { useAppSelector } from '@/hooks'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import SwipeableViews from 'react-swipeable-views'

import type { ISpecimen } from '@/types'
import ListComponent from './components/ListComponent'
import TabsBar from './components/TabsBar'
import { useState } from 'react'
import TabPanel from './components/TabPanel'

export type SpeciesListProps = {
  species: ISpecimen[]
  criticalEndangeredSpecies: ISpecimen[]
  mammalSpecies: ISpecimen[]
}

const SpeciesList = ({
  species,
  criticalEndangeredSpecies,
  mammalSpecies,
}: SpeciesListProps) => {
  const { regions } = useAppSelector((state) => state.regions)
  const { region } = useParams<{ region: string }>()
  const [value, setValue] = useState(0)
  const theme = useTheme()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }
  const currentRegionName = regions.find(
    (reg) => reg.identifier === region
  )?.name

  return (
    <>
      <TabsBar
        handleChange={handleChange}
        value={value}
        currentRegion={currentRegionName}
      />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        animateTransitions
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListComponent
            species={species}
            hasMoreResults={true}
            defaultRowHeight
            loadMore={() => {
              console.log('Loading more')
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListComponent
            species={criticalEndangeredSpecies}
            showCriticalEndangered
            hasMoreResults={true}
            loadMore={() => {
              console.log('Loading more')
            }}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ListComponent
            species={mammalSpecies}
            hasMoreResults={true}
            defaultRowHeight
            loadMore={() => {
              console.log('Loading more')
            }}
          />
        </TabPanel>
      </SwipeableViews>
    </>
  )
}

export default SpeciesList
