/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:04
 */

import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyIndexPage = lazy(() => import('./IndexPage.component'))

const IndexPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyIndexPage {...props} />
  </Suspense>
)

export default IndexPage
