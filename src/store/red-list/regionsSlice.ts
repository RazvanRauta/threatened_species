/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 16:49
 */

import RedListApi from '@/api/red-list-api'
import type { IRegion } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface IRegionsState {
  regions: IRegion[] | []
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  count: number | null
}

const initialState: IRegionsState = {
  regions: [],
  status: 'idle',
  error: null,
  count: null,
}

export const fetchRegionsAsync = createAsyncThunk(
  'regions/fetchRegions',
  async () => {
    const redListApi = new RedListApi()
    const response = await redListApi.getRegionsList()
    return response.data
  }
)

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegionsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRegionsAsync.fulfilled, (state, { payload }) => {
        if (payload.error) {
          state.status = 'failed'
          state.error = payload.error
          state.regions = []
          state.count = 0
          return state
        }
        state.status = 'idle'
        state.error = null
        state.regions = payload.results
        state.count = payload.count
      })
      .addCase(fetchRegionsAsync.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error?.message ?? 'Unknown error'
        state.regions = []
        state.count = 0
      })
  },
})

export default regionsSlice.reducer
