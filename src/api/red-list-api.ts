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

class RedListApi extends HttpClient {
  public constructor() {
    super(
      process.env.REACT_APP_API_URL ?? '',
      process.env.REACT_APP_API_TOKEN ?? ''
    )
  }

  public getRegionsList = () =>
    this.instance.get<IGetRegionsListResponse>('/region/list')

  public getSpeciesByRegion = (region: string, pageNumber: number = 0) =>
    this.instance.get<IGetSpeciesByRegionResponse>(
      `/species/region/${region}/page/${pageNumber}`
    )

  public getConservationMeasuresByIdAndRegion = (
    id: number,
    region: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<IGetConservationMeasuresResponse>(
      `measures/species/id/${id}/region/${region}`,
      { cancelToken }
    )

  public getCommonNameByName = (name: string, cancelToken?: CancelToken) =>
    this.instance.get<IGetCommonNamesResponse>(
      `/species/common_names/${name}`,
      { cancelToken }
    )
}

export default RedListApi
