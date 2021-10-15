/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import type { ISpecimen } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchSpeciesByRegion, fetchConservationMeasures } from './actions'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'

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
      .addCase(fetchSpeciesByRegion.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSpeciesByRegion.fulfilled, (state, { payload }) => {
        return {
          ...state,
          status: 'idle',
          error: null,
          species: payload.result,
          criticalEndangeredSpecies: payload.criticalEndangeredSpecies,
          mammalSpecies: payload.mammalSpecies,
        }
      })
      .addCase(fetchConservationMeasures.fulfilled, (state, { payload }) => {
        const { measures, taxonid } = payload
        const specimenIndex = state.criticalEndangeredSpecies.findIndex(
          (spec) => spec.taxonid === taxonid
        )
        if (specimenIndex > -1) {
          const critEndSpec = cloneDeep(state.criticalEndangeredSpecies)
          critEndSpec[specimenIndex].conservation_measures = isEmpty(measures)
            ? 'No available data'
            : measures
          state.criticalEndangeredSpecies = critEndSpec
        }
      })
      .addCase(fetchSpeciesByRegion.rejected, (state, { error }) => {
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
