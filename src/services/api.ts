import axios, { Axios, AxiosError, AxiosResponse } from 'axios'

/**
 * Config
 */

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Response
 */

const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response.data
const onResponseError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error.response ? error.response.data : error)

/**
 * Middleware
 */

api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api
