import { create } from 'zustand'

interface Profile {
  id: string
  publicName: string | null
  avatar: string | null
  coinBalance: number
  joinedAt: string
  bio: string | null
}

interface ProfileState {
  profile: Profile | null
  isLoading: boolean
  error: string | null
  setProfile: (profile: Profile) => void
  updatePublicName: (name: string) => void
  updateAvatar: (avatar: string) => void
  updateCoinBalance: (balance: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearProfile: () => void
}

const defaultProfile: Profile = {
  id: '',
  publicName: null,
  avatar: null,
  coinBalance: 0,
  joinedAt: new Date().toISOString(),
  bio: null,
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  updatePublicName: (name) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, publicName: name } : null,
    })),
  updateAvatar: (avatar) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, avatar } : null,
    })),
  updateCoinBalance: (coinBalance) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, coinBalance } : null,
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearProfile: () => set({ profile: null, error: null }),
}))
