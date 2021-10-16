/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import Loader from '@/components/Loader'
import Snackbar from '@/components/Snackbar'
import SpeciesList from '@/components/SpeciesList'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { HOME_ROUTE } from '@/routes'
import { fetchSpeciesByRegion } from '@/store/red-list/species/actions'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const RegionsSpeciesComponent = () => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { status, error, species, criticalEndangeredSpecies, mammalSpecies } =
    useAppSelector((state) => state.species)
  const dispatch = useAppDispatch()

  const history = useHistory()
  const params = useParams<{ region?: string }>()

  useEffect(() => {
    const { region } = params
    if (region) {
      dispatch(fetchSpeciesByRegion({ region }))
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
