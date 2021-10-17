/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 16:49
 */

import type { IRegion } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchRegionsAsync } from './actions'

export interface IRegionsState {
  regions: IRegion[] | []
  status: 'idle' | 'loading' | 'failed'
  error: string | null
  count: number | null
}

export const initialState: IRegionsState = {
  regions: [],
  status: 'idle',
  error: null,
  count: null,
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
        if (payload.error) {
          return {
            ...state,
            status: 'failed',
            error: payload.error,
            regions: [],
            count: 0,
          }
        }
        return {
          ...state,
          status: 'idle',
          error: null,
          regions: payload.results,
          count: payload.count,
        }
      })
      .addCase(fetchRegionsAsync.rejected, (state, { error }) => {
        return {
          ...state,
          status: 'failed',
          error: error?.message ?? 'Unknown error',
          regions: [],
          count: 0,
        }
      })
  },
})

export default regionsSlice.reducer
