import useSWR from 'swr'
import { http } from '../lib/http'

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

export const loginApi = (data: LoginForm) => http.post<{ jwt: string }>('/api/v1/session', data, { _buttonLoading: true })

// 用来在 router 中判断是否已登录
export const fetchMe = () => http.get<Resource<User>>('/api/v1/me')

export const getMeApi = () => {
  const { data, error, isLoading } = useSWR('/api/v1/me', async (path) => {
    const response = await http.get<Resource<User>>(path)
    return response.data.resource
  })

  return { data, error, isLoading }
}

export const addBibleApi = (data: Partial<BibleItem>) => http.post<Resource<BibleItem>>('/api/v1/bibles', data)

export const getBibleApi = () => {
  const { data, error, isLoading } = useSWR('/api/v1/bibles', async (path) => {
    const response = await http.get<Resource<BibleItem>>(path)
    return response.data.resource
  })

  return { data, error, isLoading }
}
