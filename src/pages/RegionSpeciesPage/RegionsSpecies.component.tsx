/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { HOME_ROUTE } from '@/routes'
import Loader from '@/components/Loader'
import Snackbar from '@/components/Snackbar'
import SpeciesList from '@/components/SpeciesList'
import { fetchRegionsAsync } from '@/store/red-list/regions/actions'
import { fetchSpeciesByRegionAsync } from '@/store/red-list/species/actions'

const RegionsSpeciesComponent = () => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { region = '' } = useParams<{ region?: string }>()
  const [pageNumber, setPageNumber] = useState(0)

  const { status, error, allSpecies } = useAppSelector((state) => state.species)

  const history = useHistory()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(fetchRegionsAsync())
    return () => {
      promise.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (region) {
      dispatch(fetchSpeciesByRegionAsync({ region, pageNumber }))
    } else {
      history.push(HOME_ROUTE)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  useEffect(() => {
    if ((status === 'failed' && error) || !!error) {
      setShowSnackbar(true)
    }
  }, [status, error])

  const loadMore = () => {
    setPageNumber((prev) => prev + 1)
  }

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : allSpecies[region] ? (
        <SpeciesList
          species={allSpecies[region].species}
          criticalEndangeredSpecies={
            allSpecies[region].criticalEndangeredSpecies
          }
          mammalSpecies={allSpecies[region].mammalSpecies}
          loadMore={loadMore}
          hasMoreResults={!allSpecies[region].noMoreResults}
        />
      ) : null}
      <Snackbar
        message={error ?? 'Unknown error occurred'}
        open={showSnackbar}
        setOpen={setShowSnackbar}
        severity='error'
      />
    </>
  )
}

export default RegionsSpeciesComponent
