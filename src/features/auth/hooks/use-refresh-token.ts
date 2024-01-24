import { axios } from '@/plugin/axios'
import { useAccessToken, useUser } from './use-auth'
import { useShallow } from 'zustand/react/shallow'

export default function useRefreshToken() {
  const accessToken = useAccessToken((state) => state.accessToken)
  const setUser = useUser(useShallow((val) => val.setUser))

  const refresh = async () => {
    try {
      // const response = await axios.post(
      //   '/auth/refresh-token',
      //   {
      //     withCredentials: true,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // )

      if (!accessToken) throw new Error('No access token yet !')

      const userDataResponse = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setUser(userDataResponse.data.data)
      // setAccessToken(response.data.data.access_token)
      return userDataResponse.data.data
    } catch (error) {
      return null
    }
  }

  return {
    refresh,
  }
}
