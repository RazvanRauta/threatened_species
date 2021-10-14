import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyRegionSpeciesPage = lazy(() => import('./component'))

const RegionSpeciesPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyRegionSpeciesPage {...props} />
  </Suspense>
)

export default RegionSpeciesPage
