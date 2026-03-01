import { useEffect, useCallback } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSessionStore } from '../stores/sessionStore'
import { useWalletStore } from '../stores/walletStore'
import {
  connectMetaMask,
  onAccountChanged,
  onChainChanged,
  switchToBaseNetwork,
} from '../core/wallet/metamask'
import * as rpcFunctions from '../core/rpc'

export const useWallet = () => {
  const { userId } = useSessionStore()
  const {
    address,
    isConnected,
    balance,
    chainId,
    isLoading,
    error,
    setWallet,
    setConnected,
    setLoading,
    setError,
    disconnect,
  } = useWalletStore()

  // Query wallet info from backend
  const { data: walletData } = useQuery({
    queryKey: ['wallet', userId],
    queryFn: async () => {
      if (!userId) return null
      try {
        const data = await rpcFunctions.fetchWalletInfo(userId)
        return data
      } catch (err) {
        console.error('Failed to load wallet info:', err)
        return null
      }
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  })

  // Connect MetaMask mutation
  const connectMutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error('User not authenticated')
      setLoading(true)
      try {
        const wallet = await connectMetaMask()
        const balance = wallet.balance ?? '0'
        const chainId = wallet.chainId ?? '0x2105'
        if (wallet.address) {
          setWallet(wallet.address, balance, chainId)
          setConnected(true)
        }

        // Save to backend
        if (wallet.address) {
          await rpcFunctions.updateWallet(userId, wallet.address)
        }

        // Setup listeners
        onAccountChanged(() => {
          disconnect()
        })

        onChainChanged(async (chainId) => {
          if (chainId !== '8453') {
            // Base chain ID is 8453
            await switchToBaseNetwork()
          }
        })

        return wallet
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to connect wallet'
        setError(errorMsg)
        throw err
      } finally {
        setLoading(false)
      }
    },
  })

  const handleConnect = useCallback(() => {
    connectMutation.mutate()
  }, [connectMutation])

  const handleDisconnect = useCallback(() => {
    disconnect()
  }, [disconnect])

  const handleSwitchNetwork = useCallback(async () => {
    try {
      setLoading(true)
      await switchToBaseNetwork()
      setError(null)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to switch network'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError])

  // Check if connected on mount
  useEffect(() => {
    if (address && walletData) {
      setConnected(true)
    }
  }, [address, walletData, setConnected])

  return {
    address,
    isConnected,
    balance,
    chainId,
    isLoading: isLoading || connectMutation.isPending,
    error: error || (connectMutation.error ? (connectMutation.error as Error).message : null),
    connect: handleConnect,
    disconnect: handleDisconnect,
    switchNetwork: handleSwitchNetwork,
    walletData,
    connectMutation,
  }
}
