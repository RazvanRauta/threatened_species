/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import { ISpecimen, ThunkActionStatus } from '@/types'
import {
  fetchCommonNameAsync,
  fetchConservationMeasurersAsync,
  fetchSpeciesByRegionAsync,
} from './actions'

import { createSlice } from '@reduxjs/toolkit'
import isNil from 'lodash/isNil'

export interface ISpeciesState {
  allSpecies: Record<string, ISpecimen[]>
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
      .addCase(
        fetchConservationMeasurersAsync.pending,
        (
          state,
          {
            meta: {
              arg: { region, taxonid },
            },
          }
        ) => {
          if (!isNil(state.allSpecies[region])) {
            const regionSpecies = [...state.allSpecies[region]]
            const specimenIndex = regionSpecies.findIndex(
              (specimen) => specimen.taxonid === taxonid
            )
            if (specimenIndex > -1) {
              regionSpecies[specimenIndex].conservation_measures_status =
                'loading'
              state.allSpecies[region] = [...regionSpecies]
            }
          }
        }
      )
      .addCase(
        fetchConservationMeasurersAsync.fulfilled,
        (state, { payload: { conservationMeasurers, taxonid, region } }) => {
          if (!isNil(state.allSpecies[region])) {
            const regionSpecies = [...state.allSpecies[region]]
            const specimenIndex = regionSpecies.findIndex(
              (specimen) => specimen.taxonid === taxonid
            )
            if (specimenIndex > -1) {
              regionSpecies[specimenIndex].conservation_measures_status =
                'fulfilled'
              regionSpecies[specimenIndex].conservation_measures =
                conservationMeasurers
              state.allSpecies[region] = [...regionSpecies]
            }
          }
        }
      )
      .addCase(
        fetchConservationMeasurersAsync.rejected,
        (state, { payload }) => {
          if (
            payload &&
            payload.region &&
            !isNil(state.allSpecies[payload.region])
          ) {
            const regionSpecies = [...state.allSpecies[payload.region]]
            const specimenIndex = regionSpecies.findIndex(
              (specimen) => specimen.taxonid === payload.taxonid
            )
            if (specimenIndex > -1) {
              regionSpecies[specimenIndex].conservation_measures_status =
                'failed'
              regionSpecies[specimenIndex].conservation_measures =
                payload.conservationMeasurers
              state.allSpecies[payload.region] = [...regionSpecies]
            }
          }
        }
      )
      .addCase(
        fetchCommonNameAsync.pending,
        (
          state,
          {
            meta: {
              arg: { region, taxonid },
            },
          }
        ) => {
          if (!isNil(state.allSpecies[region])) {
            const regionSpecies = [...state.allSpecies[region]]
            const specimenIndex = regionSpecies.findIndex(
              (specimen) => specimen.taxonid === taxonid
            )
            if (specimenIndex > -1) {
              regionSpecies[specimenIndex].common_name_status = 'loading'
              state.allSpecies[region] = [...regionSpecies]
            }
          }
        }
      )
      .addCase(
        fetchCommonNameAsync.fulfilled,
        (state, { payload: { commonName, taxonid, region } }) => {
          if (!isNil(state.allSpecies[region])) {
            const regionSpecies = [...state.allSpecies[region]]
            const specimenIndex = regionSpecies.findIndex(
              (specimen) => specimen.taxonid === taxonid
            )
            if (specimenIndex > -1) {
              regionSpecies[specimenIndex].common_name_status = 'fulfilled'
              regionSpecies[specimenIndex].common_name = commonName
              state.allSpecies[region] = [...regionSpecies]
            }
          }
        }
      )
      .addCase(fetchCommonNameAsync.rejected, (state, { payload }) => {
        if (
          payload &&
          payload.region &&
          !isNil(state.allSpecies[payload.region])
        ) {
          const regionSpecies = [...state.allSpecies[payload.region]]
          const specimenIndex = regionSpecies.findIndex(
            (specimen) => specimen.taxonid === payload.taxonid
          )
          if (specimenIndex > -1) {
            regionSpecies[specimenIndex].common_name_status = 'failed'
            regionSpecies[specimenIndex].common_name = payload.commonName
            state.allSpecies[payload.region] = [...regionSpecies]
          }
        }
      })
  },
})

export default speciesSlice.reducer
