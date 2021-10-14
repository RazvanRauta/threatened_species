import { IGetRegionsListResponse } from '@/types'
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
}

export default RedListApi
