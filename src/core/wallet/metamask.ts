const BASE_CHAIN_ID = '0x2105'

export interface WalletState {
  address: string | null
  isConnected: boolean
  balance: string | null
  chainId: string | null
}

export async function connectMetaMask(): Promise<WalletState> {
  try {
    const ethereum = (window as any).ethereum

    if (!ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.')
    }

    // Request account access
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    if (!accounts || accounts.length === 0) {
      throw new Error('Please authorize MetaMask in the popup window')
    }

    const address = accounts[0]

    // Check and switch network
    const chainId = await ethereum.request({ method: 'net_version' })
    if (chainId !== parseInt(BASE_CHAIN_ID, 16).toString()) {
      await switchToBaseNetwork()
    }

    // Get balance
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })

    return {
      address,
      isConnected: true,
      balance,
      chainId: BASE_CHAIN_ID,
    }
  } catch (error) {
    console.error('MetaMask connection error:', error)
    throw error
  }
}

export async function switchToBaseNetwork(): Promise<void> {
  try {
    const ethereum = (window as any).ethereum

    if (!ethereum) {
      throw new Error('MetaMask is not installed')
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_CHAIN_ID }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: BASE_CHAIN_ID,
              chainName: 'Base Mainnet',
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org'],
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
            },
          ],
        })
      } else {
        throw switchError
      }
    }
  } catch (error) {
    console.error('Network switch error:', error)
    throw error
  }
}

export function onAccountChanged(
  callback: (accounts: string[]) => void
): () => void {
  const ethereum = (window as any).ethereum

  if (!ethereum) {
    return () => {}
  }

  ethereum.on('accountsChanged', callback)

  return () => {
    ethereum.removeListener('accountsChanged', callback)
  }
}

export function onChainChanged(callback: (chainId: string) => void): () => void {
  const ethereum = (window as any).ethereum

  if (!ethereum) {
    return () => {}
  }

  ethereum.on('chainChanged', callback)

  return () => {
    ethereum.removeListener('chainChanged', callback)
  }
}

export async function getWalletBalance(address: string): Promise<string> {
  try {
    const ethereum = (window as any).ethereum

    if (!ethereum) {
      throw new Error('MetaMask is not installed')
    }

    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })

    return balance
  } catch (error) {
    console.error('Error getting balance:', error)
    throw error
  }
}
