/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import Specimen from '@/models/specimen'
import { createSlice } from '@reduxjs/toolkit'
import { fetchSpeciesByRegionAsync } from './actions'

export interface ISpeciesState {
  allSpecies: Record<string, Specimen[]>
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

export const initialState: ISpeciesState = {
  allSpecies: {},
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
        const allSpecies = { ...state.allSpecies }
        allSpecies[payload.region] = [...payload.species]
        return {
          ...state,
          status: 'idle',
          error: null,
          allSpecies,
        }
      })
      .addCase(
        fetchSpeciesByRegionAsync.rejected,
        (state, { error, payload }) => {
          const allSpecies = { ...state.allSpecies }
          if (payload) {
            allSpecies[payload.region] = []
            return {
              ...state,
              status: 'failed',
              allSpecies,
              error:
                payload.error ||
                error.message ||
                'Unknown error while fetching species',
            }
          }
          return {
            ...state,
            status: 'failed',
            error: error?.message ?? 'Unknown error while fetching species',
          }
        }
      )
  },
})

export default speciesSlice.reducer
