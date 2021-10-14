import React, { Suspense, lazy } from 'react'

import Loader from '@/components/Loader'

const LazyIndexPage = lazy(() => import('./component'))

const IndexPage = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={<Loader />}>
    <LazyIndexPage {...props} />
  </Suspense>
)

export default IndexPage
