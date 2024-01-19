import { axios } from '@/plugin/axios'
import { useAuth } from './use-auth'

export default function useRefreshToken() {
  const setAccessToken = useAuth((state) => state.setAccessToken)

  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    })

    setAccessToken(response.data.access_token)
    return response.data.access_token
  }

  return refresh
}
