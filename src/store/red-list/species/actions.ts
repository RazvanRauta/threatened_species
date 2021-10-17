/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 15 2021
 * @ Time: 16:16
 */

import RedListApi from '@/api/red-list-api'
import { Category, ClassName, ISpeciesByRegionParams, ISpecimen } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSpeciesByRegionAsync = createAsyncThunk(
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
