/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:15
 */

import type { IRegion } from '@/types'
import RedListApi from '@/api/red-list-api'
import type { RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'

export const fetchRegionsAsync = createAsyncThunk<
  { regions: IRegion[]; error?: string },
  void,
  { state: RootState; rejectValue: { error: string } }
>(
  'regions/fetchRegions',
  async (_, { rejectWithValue }) => {
    const redListApi = new RedListApi()
    try {
      const { data } = await redListApi.getRegionsList()

      if (data && data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.results)) {
        const regionList: IRegion[] = data.results
        return {
          regions: regionList,
        }
      }
      throw new Error('No results were found')
    } catch (error: any) {
      const errorMessage =
        error.message ?? 'Error while trying to fetch regions list'
      console.log(errorMessage)
      return rejectWithValue({ error: errorMessage })
    }
  },
  {
    condition: (_, { getState }) => {
      const rootState = getState()
      return isEmpty(rootState.regions.regions)
    },
  }
)
