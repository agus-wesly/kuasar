import { axios } from '@/plugin/axios'
import { useAccessToken, useUser } from './use-auth'
import { useShallow } from 'zustand/react/shallow'

export default function useRefreshToken() {
  const { accessToken, setAccessToken } = useAccessToken()
  const setUser = useUser(useShallow((val) => val.setUser))

  const refresh = async () => {
    try {
      const response = await axios.post(
        '/auth/refresh-token',
        {
          withCredentials: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const userDataResponse = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${response.data.data.access_token}`,
        },
      })

      setUser(userDataResponse.data.data)
      setAccessToken(response.data.data.access_token)
      return response.data.access_token
    } catch (error) {
      return null
    }
  }

  return {
    refresh,
  }
}
