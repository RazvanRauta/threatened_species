/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import type { ISpecimen, ThunkActionStatus } from '@/types'

import { createSlice } from '@reduxjs/toolkit'
import { fetchSpeciesByRegionAsync } from './actions'

export interface ISpeciesState {
  allSpecies: Record<
    string,
    {
      criticalEndangeredSpecies: ISpecimen[]
      mammalSpecies: ISpecimen[]
      species: ISpecimen[]
      noMoreResults?: boolean
    }
  >
  status: ThunkActionStatus
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
      .addCase(
        fetchSpeciesByRegionAsync.pending,
        (
          state,
          {
            meta: {
              arg: { pageNumber },
            },
          }
        ) => {
          if (!pageNumber) {
            state.status = 'loading'
          }
        }
      )
      .addCase(
        fetchSpeciesByRegionAsync.fulfilled,
        (
          state,
          {
            payload,
            meta: {
              arg: { pageNumber },
            },
          }
        ) => {
          const allSpecies = { ...state.allSpecies }
          const {
            criticalEndangeredSpecies,
            mammalSpecies,
            species,
            region,
            noMoreResults,
          } = payload

          if (!pageNumber || !allSpecies[region]) {
            allSpecies[region] = {
              criticalEndangeredSpecies,
              species,
              mammalSpecies,
              noMoreResults,
            }

            return {
              ...state,
              status: 'idle',
              error: null,
              allSpecies,
            }
          }
          allSpecies[region] = {
            criticalEndangeredSpecies: [
              ...allSpecies[region].criticalEndangeredSpecies,
              ...criticalEndangeredSpecies,
            ],
            species: [...allSpecies[region].species, ...species],
            mammalSpecies: [
              ...allSpecies[region].mammalSpecies,
              ...mammalSpecies,
            ],
            noMoreResults,
          }
          return {
            ...state,
            status: 'idle',
            error: null,
            allSpecies: { ...state.allSpecies, ...allSpecies },
          }
        }
      )
      .addCase(
        fetchSpeciesByRegionAsync.rejected,
        (
          state,
          {
            error,
            payload,
            meta: {
              arg: { region },
            },
          }
        ) => {
          const noMoreResults = payload?.noMoreResults

          if (noMoreResults) {
            state.allSpecies[region].noMoreResults = true
            return
          }

          const allSpecies = { ...state.allSpecies }
          const errorMsg = payload?.error

          allSpecies[region] = {
            criticalEndangeredSpecies: [],
            species: [],
            mammalSpecies: [],
            noMoreResults: true,
          }
          return {
            ...state,
            status: 'failed',
            allSpecies,
            error:
              errorMsg ||
              error.message ||
              'Unknown error while fetching species',
          }
        }
      )
  },
})

export default speciesSlice.reducer
