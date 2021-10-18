/**
 *  @author: Razvan Rauta
 *  Date: Oct 16 2021
 *  Time: 17:17
 */

import Specimen from '@/models/specimen'
import memoize from 'memoize-one'

const createItemData = memoize(
  (
    species: Specimen[],
    region: string | undefined,
    showCriticalEndangered?: boolean
  ) => ({
    species,
    region,
    showCriticalEndangered,
  })
)

export { createItemData }
