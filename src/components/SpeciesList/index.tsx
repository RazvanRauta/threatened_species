/**
 *  @author: Razvan Rauta
 *  Date: Oct 14 2021
 *  Time: 23:11
 */

import { Typography } from '@mui/material'

import type { ISpecimen } from '@/types'
import ListComponent from './components/ListComponent'
import { useAppSelector } from '@/hooks'
import { useParams } from 'react-router-dom'

export type SpeciesListProps = {
  species: ISpecimen[]
  showCriticalEndangered: boolean
}

const SpeciesList = ({ species, showCriticalEndangered }: SpeciesListProps) => {
  const { regions } = useAppSelector((state) => state.regions)
  const { region } = useParams<{ region: string }>()

  const currentRegionName = regions.find(
    (reg) => reg.identifier === region
  )?.name

  return (
    <>
      {currentRegionName && (
        <Typography
          variant='h5'
          sx={{
            marginBottom: '20px',
          }}
        >{`All ${
          showCriticalEndangered ? 'Critical Endangered' : ''
        } species from ${currentRegionName}`}</Typography>
      )}
      <ListComponent
        species={species}
        hasMoreResults={true}
        loadMore={() => {
          console.log('Loading more')
        }}
        showCriticalEndangered={showCriticalEndangered}
      />
    </>
  )
}

export default SpeciesList
