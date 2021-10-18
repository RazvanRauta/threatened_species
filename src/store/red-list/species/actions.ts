/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:16
 */

import { ISpeciesByRegionParams } from '@/types'
import RedListApi from '@/api/red-list-api'
import { RootState } from '@/store'
import Specimen from '@/models/specimen'
import { createAsyncThunk } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty'

export const fetchSpeciesByRegionAsync = createAsyncThunk<
  { species: Specimen[]; region: string; error?: string },
  ISpeciesByRegionParams,
  { state: RootState; rejectValue: { error: string; region: string } }
>(
  'species/fetchSpeciesByRegion',
  async ({ region, pageNumber }, { rejectWithValue }) => {
    let speciesList: Specimen[] = []
    const redListApi = new RedListApi()

    try {
      const { data } = await redListApi.getSpeciesByRegion(region, pageNumber)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data && !isEmpty(data.result)) {
        speciesList = data.result.map(
          (specimenDetails) =>
            new Specimen(
              specimenDetails.taxonid,
              specimenDetails.kingdom_name,
              specimenDetails.phylum_name,
              specimenDetails.class_name,
              specimenDetails.order_name,
              specimenDetails.family_name,
              specimenDetails.scientific_name,
              specimenDetails.category
            )
        )

        return { species: speciesList, region }
      }

      throw new Error('No results were found')
    } catch (error: any) {
      const errorMessage =
        error.message ?? 'Error while trying to fetch regions list'

      console.log(errorMessage)

      return rejectWithValue({ error: errorMessage, region })
    }
  }
)
