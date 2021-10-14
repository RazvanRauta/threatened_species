/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 13:48
 */

import IndexPage from '@/pages/IndexPage'
import RegionSpeciesPage from '@/pages/RegionSpeciesPage'
import { Routes } from '@/types'

export const HOME_ROUTE = '/'
export const REGION_SPECIES_ROUTE = '/species/:region'

export const routes: Routes = [
  { path: HOME_ROUTE, component: IndexPage },
  { path: REGION_SPECIES_ROUTE, component: RegionSpeciesPage },
]
