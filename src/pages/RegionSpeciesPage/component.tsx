import Loader from '@/components/Loader'
import Snackbar from '@/components/Snackbar'
import SpeciesGrid from '@/components/SpeciesGrid'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { HOME_ROUTE } from '@/routes'
import { fetchSpeciesByRegion } from '@/store/red-list/speciesSlice'
import { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

const RegionsSpeciesComponent = () => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { status, error, species } = useAppSelector((state) => state.species)
  const dispatch = useAppDispatch()

  const match = useRouteMatch<{ region: string }>()
  const history = useHistory()

  useEffect(() => {
    const { region } = match.params
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
        <SpeciesGrid species={species} />
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
