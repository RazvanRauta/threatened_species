/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyRegionSpeciesPage = lazy(() => import('./RegionsSpecies.component'))

const RegionSpeciesPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyRegionSpeciesPage {...props} />
  </Suspense>
)

export default RegionSpeciesPage
