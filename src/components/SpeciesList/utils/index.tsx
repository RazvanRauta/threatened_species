/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:17
 */

import type { ISpecimen } from '@/types'
import memoize from 'memoize-one'

const createItemData = memoize(
  (
    species: ISpecimen[],
    region: string | undefined,
    showCriticalEndangered?: boolean
  ) => ({
    species,
    region,
    showCriticalEndangered,
  })
)

export { createItemData }
