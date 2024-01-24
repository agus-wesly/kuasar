import { useShallow } from 'zustand/react/shallow'
import { useAccessToken, useUser } from './use-auth'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
  const setUser = useUser(useShallow((state) => state.setUser))
  const setAccessToken = useAccessToken(
    useShallow((state) => state.setAccessToken)
  )
  const navigate = useNavigate()

  function logOut() {
    setUser(null)
    setAccessToken(null)
    navigate('/')
  }

  return {
    logOut,
  }
}
