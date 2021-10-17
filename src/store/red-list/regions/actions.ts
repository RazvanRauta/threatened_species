/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:15
 */

import { IGetRegionsListResponse } from '@/types'
import RedListApi from '@/api/red-list-api'
import type { RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'

export const fetchRegionsAsync = createAsyncThunk<
  IGetRegionsListResponse,
  void,
  { state: RootState }
>(
  'regions/fetchRegions',
  async () => {
    const redListApi = new RedListApi()
    try {
      const response = await redListApi.getRegionsList()
      return response.data
    } catch (error: any) {
      const errorMessage =
        error.message ?? 'Error while trying to fetch regions list'

      console.log(errorMessage)

      return {
        count: 0,
        results: [],
        error: errorMessage,
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const rootState = getState()
      return isEmpty(rootState.regions.regions)
    },
  }
)
