/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import { createSlice } from '@reduxjs/toolkit'

import { fetchSpeciesByRegionAsync } from './actions'
import type { ISpecimen } from '@/types'

export interface ISpeciesState {
  species: ISpecimen[]
  criticalEndangeredSpecies: ISpecimen[]
  mammalSpecies: ISpecimen[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: ISpeciesState = {
  species: [],
  criticalEndangeredSpecies: [],
  mammalSpecies: [],
  status: 'idle',
  error: null,
}

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpeciesByRegionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSpeciesByRegionAsync.fulfilled, (state, { payload }) => {
        return {
          ...state,
          status: 'idle',
          error: null,
          species: payload.result,
          criticalEndangeredSpecies: payload.criticalEndangeredSpecies,
          mammalSpecies: payload.mammalSpecies,
        }
      })
      .addCase(fetchSpeciesByRegionAsync.rejected, (state, { error }) => {
        return {
          ...state,
          status: 'failed',
          error: error?.message ?? 'Unknown error while fetching species',
          species: [],
          criticalEndangeredSpecies: [],
          mammalSpecies: [],
        }
      })
  },
})

export default speciesSlice.reducer
