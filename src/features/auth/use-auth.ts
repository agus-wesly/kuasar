import { UserData } from '@/types/user'
import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: UserData | null
  setUser: (user: UserData | null) => void
}

type AccessTokenState = {
  accessToken: string | null
  setAccessToken: (newToken: string) => void
}

export const useUser = create<AuthState>((set) => ({
  user: null,
  setUser: (newVal) => set({ user: newVal }),
}))

const persistMiddleware = (f: StateCreator<AccessTokenState, [], []>) =>
  persist<AccessTokenState>(f, { name: 'accessToken' })

export const useAccessToken = create<AccessTokenState>()(
  persistMiddleware((set) => ({
    accessToken: null,
    setAccessToken: (val) => set({ accessToken: val }),
  }))
)
