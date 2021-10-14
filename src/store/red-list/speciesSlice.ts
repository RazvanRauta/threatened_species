/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 14 2021
 * @ Time: 22:29
 */

import RedListApi from '@/api/red-list-api'
import { Category, ClassName, ISpeciesByRegionParams, ISpecimen } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface ISpeciesState {
  species: ISpecimen[] | []
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: ISpeciesState = {
  species: [],
  status: 'idle',
  error: null,
}

export const fetchSpeciesByRegion = createAsyncThunk(
  'species/fetchSpeciesByRegion',
  async ({ region, pageNumber }: ISpeciesByRegionParams) => {
    let parsedResults: ISpecimen[] = []
    const redListApi = new RedListApi()
    try {
      const { data } = await redListApi.getSpeciesByRegion(region, pageNumber)
      if (data) {
        parsedResults = data?.result.filter(
          (specimen) =>
            specimen.category === Category.CR &&
            specimen.class_name === ClassName.Mammalia
        )
        for (let index = 0; index < parsedResults.length; index++) {
          const { taxonid } = parsedResults[index]
          try {
            const { data: datum } =
              await redListApi.getConservationMeasuresByIdAndRegion(
                taxonid,
                region
              )

            if (datum) {
              parsedResults[index]['conservation_measures'] = datum.result
                .map((mes) => mes.title)
                .join(', ')
            }
          } catch (errs: any) {
            console.log(errs)
          }
        }
      }

      return {
        error: data.error,
        result: parsedResults,
      }
    } catch (err: any) {
      console.log(err)
      return {
        error: err.message,
        result: [],
      }
    }
  }
)

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
        if (payload.error) {
          state.status = 'failed'
          state.error = payload.error
          state.species = []
          return state
        }
        state.status = 'idle'
        state.error = null
        //show only Critical Endangered species
        state.species = payload.result.filter(
          (specimen) => specimen.category === Category.CR
        )
      })
      .addCase(fetchSpeciesByRegion.rejected, (state, { error }) => {
        state.status = 'failed'
        state.error = error?.message ?? 'Unknown error'
        state.species = []
      })
  },
})

export default speciesSlice.reducer
