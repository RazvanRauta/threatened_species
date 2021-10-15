/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:15
 */

import RedListApi from '@/api/red-list-api'
import { IGetRegionsListResponse } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import isEmpty from 'lodash/isEmpty'

export const fetchRegionsAsync = createAsyncThunk<
  IGetRegionsListResponse,
  void,
  { state: RootState }
>(
  'regions/fetchRegions',
  async () => {
    const redListApi = new RedListApi()
    const response = await redListApi.getRegionsList()
    return response.data
  },
  {
    condition: (_, { getState }) => {
      const rootState = getState()
      return isEmpty(rootState.regions.regions)
    },
  }
)
