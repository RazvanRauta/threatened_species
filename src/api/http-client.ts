/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 13 2021
 * @ Time: 19:24
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

abstract class HttpClient {
  protected readonly instance: AxiosInstance
  protected readonly token: string

  public constructor(baseURL: string, token: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    })
    this.token = token

    this._initializeRequestInterceptor()
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.params = { ...config.params, token: this.token }
    return config
  }

  protected _handleError = (error: any) => Promise.reject(error)
}

export default HttpClient
