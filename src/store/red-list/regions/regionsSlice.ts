/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 16:49
 */

import Region from '@/models/region'
import { createSlice } from '@reduxjs/toolkit'
import { fetchRegionsAsync } from './actions'

export interface IRegionsState {
  regions: Region[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

export const initialState: IRegionsState = {
  regions: [],
  status: 'idle',
  error: null,
}

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
        return {
          ...state,
          status: 'idle',
          error: null,
          regions: payload.regions,
        }
      })
      .addCase(fetchRegionsAsync.rejected, (state, { error }) => {
        return {
          ...state,
          status: 'failed',
          error: error?.message ?? 'Unknown error',
          regions: [],
        }
      })
  },
})

export default regionsSlice.reducer
