import { ISpeciesByRegionParams, ISpecimen } from '@/types'

/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:16
 */
import { CancelToken } from 'axios'
import RedListApi from '@/api/red-list-api'
import { RootState } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

export const fetchSpeciesByRegionAsync = createAsyncThunk<
  { species: ISpecimen[]; region: string; error?: string },
  ISpeciesByRegionParams,
  { state: RootState; rejectValue: { error: string; region: string } }
>(
  'species/fetchSpeciesByRegion',
  async ({ region, pageNumber }, { rejectWithValue }) => {
    let speciesList: ISpecimen[] = []
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getSpeciesByRegion(region, pageNumber)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.result)) {
        speciesList = data.result

        return { species: speciesList, region }
      }

      throw new Error('No results were found')
    } catch (error: any) {
      const errorMessage =
        error.message ?? `Error while trying to fetch species from ${region}`

      console.log(errorMessage)

      return rejectWithValue({ error: errorMessage, region })
    }
  }
)

export const fetchCommonNameAsync = createAsyncThunk<
  { commonName: string; taxonid: number; region: string },
  {
    scientificName: string
    taxonid: number
    region: string
    cancelToken: CancelToken
  },
  {
    state: RootState
    rejectValue: {
      error: string
      taxonid: number
      region: string
      commonName: string
    }
  }
>(
  'species/fetchCommonName',
  async (
    { scientificName, taxonid, region, cancelToken },
    { rejectWithValue }
  ) => {
    let commonName = 'Scientific name'
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getCommonNameByName(
        scientificName,
        cancelToken
      )

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.result)) {
        commonName = data.result[0].taxonname
      }
      return { commonName, taxonid, region }
    } catch (error: any) {
      const errorMessage =
        error.message ??
        `Error while trying to fetch common name for ${taxonid}`

      console.log(errorMessage)

      return rejectWithValue({
        error: errorMessage,
        taxonid,
        commonName,
        region,
      })
    }
  },
  {
    condition: ({ region, taxonid }, { getState }) => {
      const {
        species: { allSpecies },
      } = getState()
      const regionSpecies = allSpecies[region]

      if (!isNil(regionSpecies)) {
        const specimenIndex = regionSpecies.findIndex(
          (specimen) => specimen.taxonid === taxonid
        )
        if (specimenIndex > -1) {
          const requestStatus = regionSpecies[specimenIndex].common_name_status
          if (requestStatus === 'fulfilled' || requestStatus === 'loading') {
            return false
          }
        }
      }
    },
  }
)

export const fetchConservationMeasurersAsync = createAsyncThunk<
  { conservationMeasurers: string; taxonid: number; region: string },
  { taxonid: number; region: string; cancelToken: CancelToken },
  {
    state: RootState
    rejectValue: {
      error: string
      taxonid: number
      conservationMeasurers: string
      region: string
    }
  }
>(
  'species/fetchConservationMeasurers',
  async ({ taxonid, region, cancelToken }, { rejectWithValue }) => {
    let conservationMeasurers = 'No data available'
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getConservationMeasuresByIdAndRegion(
        taxonid,
        region,
        cancelToken
      )

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.result)) {
        conservationMeasurers = data.result.map((mes) => mes.title).join(', ')
      }
      return { conservationMeasurers, taxonid, region }
    } catch (error: any) {
      const errorMessage =
        error.message ?? 'Error while trying to fetch conservation measurers '

      console.log(errorMessage)

      return rejectWithValue({
        error: errorMessage,
        taxonid,
        conservationMeasurers,
        region,
      })
    }
  },
  {
    condition: ({ region, taxonid }, { getState }) => {
      const {
        species: { allSpecies },
      } = getState()
      const regionSpecies = allSpecies[region]

      if (!isNil(regionSpecies)) {
        const specimenIndex = regionSpecies.findIndex(
          (specimen) => specimen.taxonid === taxonid
        )
        if (specimenIndex > -1) {
          const requestStatus =
            regionSpecies[specimenIndex].conservation_measures_status
          if (requestStatus === 'fulfilled' || requestStatus === 'loading') {
            return false
          }
        }
      }
    },
  }
)
