/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 13 2021
 * @ Time: 19:27
 */

import type {
  IGetCommonNamesResponse,
  IGetConservationMeasuresResponse,
  IGetRegionsListResponse,
  IGetSpeciesByRegionResponse,
} from '@/types'

import { CancelToken } from 'axios'
import HttpClient from './http-client'

export const REGIONS_LIST_PATH = '/region/list'
export const SPECIES_BY_REGION_PATH = '/species/region/'
export const MEASURES_BY_ID_PATH = '/measures/species/id/'
export const COMMON_NAME_PATH = '/species/common_names/'

class RedListApi extends HttpClient {
  public constructor() {
    super(
      process.env.REACT_APP_API_URL ?? '',
      process.env.REACT_APP_API_TOKEN ?? ''
    )
  }

  public getRegionsList = () =>
    this.instance.get<IGetRegionsListResponse>(REGIONS_LIST_PATH)

  public getSpeciesByRegion = (region: string, pageNumber: number = 0) =>
    this.instance.get<IGetSpeciesByRegionResponse>(
      `${SPECIES_BY_REGION_PATH}${region}/page/${pageNumber}`
    )

  public getConservationMeasuresByIdAndRegion = (
    id: number,
    region: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<IGetConservationMeasuresResponse>(
      `${MEASURES_BY_ID_PATH}${id}/region/${region}`,
      { cancelToken }
    )

  public getCommonNameByName = (name: string, cancelToken?: CancelToken) =>
    this.instance.get<IGetCommonNamesResponse>(`${COMMON_NAME_PATH}${name}`, {
      cancelToken,
    })
}

export default RedListApi
