/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2021
 * @ Time: 22:09
 */

import type { CancelToken } from 'axios'
import type { ISpecimen } from '@/types'
import RedListApi from '@/api/red-list-api'
import isEmpty from 'lodash/isEmpty'

interface ILoadConservationMeasurersParams {
  cancelToken: CancelToken
  region: string
  specimen: ISpecimen
  setLoadingMeasurers: (val: boolean) => void
  setMeasurers: (val: string) => void
  measurersData: Record<string, string>
}

export const loadConservationMeasurers = async ({
  cancelToken,
  region,
  specimen,
  setLoadingMeasurers,
  setMeasurers,
  measurersData,
}: ILoadConservationMeasurersParams) => {
  const defaultMeasures = 'No data available'
  if (region && specimen) {
    setLoadingMeasurers(true)
    const redListApi = new RedListApi()
    try {
      const { data } = await redListApi.getConservationMeasuresByIdAndRegion(
        specimen.taxonid,
        region,
        cancelToken
      )
      if (data) {
        const { result } = data
        const measurersDatum = isEmpty(result)
          ? defaultMeasures
          : result.map((mes) => mes.title).join(', ')

        setMeasurers(
          JSON.stringify({
            ...measurersData,
            [specimen.taxonid]: measurersDatum,
          })
        )
      } else {
        setMeasurers(
          JSON.stringify({
            ...measurersData,
            [specimen.taxonid]: defaultMeasures,
          })
        )
      }
    } catch (err: any) {
      console.log(err.message)
      setMeasurers(
        JSON.stringify({
          ...measurersData,
          [specimen.taxonid]: defaultMeasures,
        })
      )
    } finally {
      setLoadingMeasurers(false)
    }
  }
}

interface ILoadCommonNameParams {
  cancelToken: CancelToken
  specimen: ISpecimen
  setIsLoadingName: (val: boolean) => void
  setCommonNames: (val: string) => void
  commonNamesData: Record<string, string>
}

export const loadCommonName = async ({
  cancelToken,
  specimen,
  setIsLoadingName,
  setCommonNames,
  commonNamesData,
}: ILoadCommonNameParams) => {
  const defaultName = 'Scientific name'
  if (specimen) {
    setIsLoadingName(true)
    const redListApi = new RedListApi()
    try {
      const { data } = await redListApi.getCommonNameByName(
        specimen.scientific_name,
        cancelToken
      )
      if (data) {
        const { result } = data
        const nameData = isEmpty(result) ? defaultName : result[0]?.taxonname

        setCommonNames(
          JSON.stringify({
            ...commonNamesData,
            [specimen.taxonid]: nameData,
          })
        )
      } else {
        setCommonNames(
          JSON.stringify({
            ...commonNamesData,
            [specimen.taxonid]: defaultName,
          })
        )
      }
    } catch (err: any) {
      console.log(err.message)
      setCommonNames(
        JSON.stringify({
          ...commonNamesData,
          [specimen.taxonid]: defaultName,
        })
      )
    } finally {
      setIsLoadingName(false)
    }
  }
}
