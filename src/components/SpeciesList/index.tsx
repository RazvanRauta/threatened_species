/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 23:11
 */

import { Category, ClassName } from '@/types'

import ListComponent from './components/ListComponent'
import Specimen from '@/models/specimen'
import SwipeableViews from 'react-swipeable-views'
import TabPanel from './components/TabPanel'
import TabsBar from './components/TabsBar'
import { useAppSelector } from '@/hooks'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

export type SpeciesListProps = {
  species: Specimen[]
}

const SpeciesList = ({ species }: SpeciesListProps) => {
  const { regions } = useAppSelector((state) => state.regions)
  const { region } = useParams<{ region: string }>()
  const [value, setValue] = useState(0)
  const theme = useTheme()

  console.log(species)

  const criticalEndangeredSpecies = species
    ? species.filter(({ category }) => category === Category.CR)
    : []

  const mammalSpecies = species
    ? species.filter(({ class_name }) => class_name === ClassName.Mammalia)
    : []

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
