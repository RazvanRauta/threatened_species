/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:16
 */

import { Category, ClassName, ISpeciesByRegionParams, ISpecimen } from '@/types'

import RedListApi from '@/api/red-list-api'
import type { RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'

const NO_RESULTS_ERR_MESSAGE = 'No results were found'

export const fetchSpeciesByRegionAsync = createAsyncThunk<
  {
    species: ISpecimen[]
    criticalEndangeredSpecies: ISpecimen[]
    mammalSpecies: ISpecimen[]
    region: string
    error?: string
    noMoreResults: boolean
  },
  ISpeciesByRegionParams,
  {
    state: RootState
    rejectValue: { error: string; region: string; noMoreResults?: boolean }
  }
>(
  'species/fetchSpeciesByRegion',
  async ({ region, pageNumber }, { rejectWithValue }) => {
    const criticalEndangeredSpecies: ISpecimen[] = []
    const mammalSpecies: ISpecimen[] = []
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getSpeciesByRegion(region, pageNumber)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.result)) {
        data.result.forEach((specimen) => {
          if (specimen.category === Category.CR) {
            criticalEndangeredSpecies.push(specimen)
          }
          if (specimen.class_name === ClassName.Mammalia) {
            mammalSpecies.push(specimen)
          }
        })

        return {
          species: data.result,
          criticalEndangeredSpecies,
          mammalSpecies,
          region,
          noMoreResults: false,
        }
      }

      throw new Error(NO_RESULTS_ERR_MESSAGE)
    } catch (error: any) {
      const errorMessage =
        error.message ?? `Error while trying to fetch species from ${region}`

      console.log(errorMessage)

      if (errorMessage === NO_RESULTS_ERR_MESSAGE && pageNumber) {
        return rejectWithValue({
          error: errorMessage,
          region,
          noMoreResults: true,
        })
      }

      return rejectWithValue({ error: errorMessage, region })
    }
  }
)
