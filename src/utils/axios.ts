import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
  

const requestMiddleware = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (localStorage.getItem('accessToken')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return config
}
  
const responseSuccessMiddleware = (response: AxiosResponse): AxiosResponse => {
    return response
}

const responseErrorMiddleware = (error: AxiosError): Promise<never> => {
    return Promise.reject(error)
}
  

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    instance.interceptors.request.use(requestMiddleware)
    instance.interceptors.response.use(responseSuccessMiddleware, responseErrorMiddleware)

    const get = <T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> =>
    instance.get<T>(url, { params, ...config }).then(response =>  response.data)

    const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    instance.post<T>(url, data, config).then(response => response.data)

    const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    instance.put<T>(url, data, config).then(response => response.data)

    const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    instance.delete<T>(url, config).then(response => response.data)

    return { get, post, put, delete: del }
}

const axiosInstance = createAxiosInstance()
export default axiosInstance
