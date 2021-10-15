/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:16
 */

import RedListApi from '@/api/red-list-api'
import {
  Category,
  ClassName,
  IConservationMeasuresParams,
  ISpeciesByRegionParams,
  ISpecimen,
} from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

import type { RootState } from './../../index'

export const fetchSpeciesByRegion = createAsyncThunk(
  'species/fetchSpeciesByRegion',
  async ({ region, pageNumber }: ISpeciesByRegionParams) => {
    const criticalEndangeredSpecies: ISpecimen[] = []
    const mammalSpecies: ISpecimen[] = []
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getSpeciesByRegion(region, pageNumber)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && data.result) {
        data?.result?.forEach((specimen) => {
          if (specimen.category === Category.CR) {
            criticalEndangeredSpecies.push(specimen)
          }
          if (specimen.class_name === ClassName.Mammalia) {
            mammalSpecies.push(specimen)
          }
        })

        return { ...data, criticalEndangeredSpecies, mammalSpecies }
      }

      throw new Error('No results were found')
    } catch (err: any) {
      console.log(err)
      return {
        error: err.message,
        result: [],
        criticalEndangeredSpecies: [],
        mammalSpecies: [],
      }
    }
  }
)

type FetchConservationMeasuresReturn = {
  taxonid: number
  measures: string | null
  error?: undefined | string
}

// ! failed attempt to save Conservation Measures to redux
export const fetchConservationMeasures = createAsyncThunk<
  FetchConservationMeasuresReturn,
  IConservationMeasuresParams,
  { state: RootState }
>(
  'species/fetchConservationMeasures',
  async ({ region, taxonid }, { getState }) => {
    const redListApi = new RedListApi()
    try {
      const { data } = await redListApi.getConservationMeasuresByIdAndRegion(
        taxonid,
        region
      )
      if (data.error) {
        throw new Error(data.error)
      }
      if (data && data.result) {
        const measures = data?.result?.map((mes) => mes.title).join(', ')
        return { taxonid, measures }
      }
      throw new Error('No results were found')
    } catch (errs: any) {
      console.log(errs)
      return { taxonid, measures: null, error: errs.message }
    }
  },
  {
    condition: ({ taxonid }: IConservationMeasuresParams, { getState }) => {
      // ! It doesn't work, the state is outdated, maybe some bug from the library
      return !hasConservationMeasures(
        getState().species.criticalEndangeredSpecies,
        taxonid
      )
    },
  }
)

const hasConservationMeasures = (
  criticalEndangeredSpecies: ISpecimen[],
  id: number
) => {
  const specimen = criticalEndangeredSpecies.find((spec) => spec.taxonid === id)
  if (specimen) {
    return specimen.conservation_measures
  }
  return false
}
