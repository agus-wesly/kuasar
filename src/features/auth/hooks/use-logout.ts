import { useShallow } from 'zustand/react/shallow'
import { useAccessToken, useUser } from './use-auth'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export function useLogout() {
  const setUser = useUser(useShallow((state) => state.setUser))
  const setAccessToken = useAccessToken(
    useShallow((state) => state.setAccessToken),
  )
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function logOut() {
    setUser(null)
    setAccessToken(null)
    queryClient.clear()
    navigate('/')
  }

  return {
    logOut,
  }
}
