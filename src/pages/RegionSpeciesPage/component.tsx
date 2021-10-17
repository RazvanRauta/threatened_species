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
  const { status, error, species, criticalEndangeredSpecies, mammalSpecies } =
    useAppSelector((state) => state.species)

  const history = useHistory()
  const params = useParams<{ region?: string }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(fetchRegionsAsync())
    return () => {
      promise.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { region } = params
    if (region) {
      dispatch(fetchSpeciesByRegionAsync({ region }))
    } else {
      history.push(HOME_ROUTE)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ((status === 'failed' && error) || !!error) {
      setShowSnackbar(true)
    }
  }, [status, error])

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : species ? (
        <SpeciesList
          species={species}
          criticalEndangeredSpecies={criticalEndangeredSpecies}
          mammalSpecies={mammalSpecies}
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
