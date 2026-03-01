import { create } from 'zustand'

interface WalletState {
  address: string | null
  isConnected: boolean
  balance: string | null
  chainId: string | null
  isLoading: boolean
  error: string | null
  setWallet: (address: string, balance: string, chainId: string) => void
  setConnected: (connected: boolean) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateBalance: (balance: string) => void
  disconnect: () => void
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  balance: null,
  chainId: null,
  isLoading: false,
  error: null,
  setWallet: (address, balance, chainId) =>
    set({
      address,
      balance,
      chainId,
      isConnected: true,
      error: null,
    }),
  setConnected: (connected) => set({ isConnected: connected }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  updateBalance: (balance) => set({ balance }),
  disconnect: () =>
    set({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      error: null,
    }),
}))
