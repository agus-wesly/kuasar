import { create } from 'zustand'

type User = Record<string, any>

type AuthState = {
  user: User | null
  accessToken: string | null
  signIn: (payload: User) => void
  signOut: (payload: User) => void
  setAccessToken: (payload: string) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  accessToken: '',
  signIn: (payLoad) => set({ user: payLoad }),
  signOut: () => set({ user: null }),
  setAccessToken: (payload) => set({ accessToken: payload }),
}))
