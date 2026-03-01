import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Glow } from '../../components/ui/Glow'
import { useWallet } from '../../hooks/useWallet'

export const WalletPage: React.FC = () => {
  const {
    address,
    isConnected,
    balance,
    chainId,
    isLoading,
    error,
    connect,
    disconnect,
    switchNetwork,
  } = useWallet()

  const isWrongNetwork = chainId && chainId !== '0x2105' && chainId !== '8453'

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const formatBalance = (bal: string) => {
    if (!bal) return '0.00'
    const wei = BigInt(bal)
    const eth = wei / BigInt(10 ** 18)
    return eth.toString()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">WALLET</h1>
          <p className="text-white/50">Gestisci il tuo portafoglio Web3 e i tuoi asset</p>
        </div>

        {/* Main Card */}
        {isConnected && address ? (
          <>
            {/* Connected State */}
            <Glow color="emerald" intensity="high">
              <Card>
                <div className="space-y-8">
                  {/* Network Status Alert */}
                  {isWrongNetwork && (
                    <motion.div
                      className="bg-red-500/20 border border-red-500/50 rounded-lg p-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-red-300 font-bold mb-3">⚠️ Rete Sbagliata</p>
                      <p className="text-white/70 text-sm mb-4">
                        Per favore cambia su Base Mainnet per accedere ai tuoi asset
                      </p>
                      <Button
                        onClick={switchNetwork}
                        variant="secondary"
                        size="md"
                        loading={isLoading}
                        fullWidth
                      >
                        Cambia su Base Mainnet
                      </Button>
                    </motion.div>
                  )}

                  {/* Success State */}
                  {!isWrongNetwork && (
                    <motion.div
                      className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-emerald-300 font-bold">✓ Wallet Connesso</p>
                    </motion.div>
                  )}

                  {/* Wallet Address Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white/50 text-sm font-semibold">INDIRIZZO WALLET</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigator.clipboard.writeText(address)}
                        className="text-emerald-500 hover:text-emerald-400 text-xs font-semibold"
                      >
                        Copia
                      </motion.button>
                    </div>
                    <motion.div
                      className="bg-black/50 border border-emerald-500/30 rounded-lg p-4 font-mono text-emerald-500 break-all text-sm hover:border-emerald-500 transition-all cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                    >
                      {address}
                    </motion.div>
                  </div>

                  {/* Network & Balance Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-white/50 text-xs font-semibold mb-2">RETE</p>
                      <p className="text-2xl font-bold text-emerald-500">
                        {chainId === '0x2105' || chainId === '8453'
                          ? 'Base'
                          : chainId || 'Unknown'}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-white/50 text-xs font-semibold mb-2">SALDO ETH</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {formatBalance(balance || '0')}
                      </p>
                    </motion.div>
                  </div>

                  {/* Coin Cancellieri Section */}
                  <div className="border-t border-emerald-500/20 pt-6">
                    <p className="text-white/50 text-xs font-semibold mb-3">COIN CANCELLIERI</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-yellow-400">0</p>
                      <p className="text-white/50 text-sm">disponibili</p>
                    </div>
                    <p className="text-white/40 text-xs mt-3">
                      I tuoi Coin Cancellieri saranno visibili quando sei su Base Mainnet
                    </p>
                  </div>

                  {/* Transaction Info */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-white/70 text-sm mb-3">
                      💡 Suggerimento: Assicurati di avere abbastanza ETH per le transazioni
                    </p>
                  </div>

                  {/* Disconnect Button */}
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      onClick={disconnect}
                      variant="danger"
                      size="md"
                      fullWidth
                      className="bg-red-500/30 hover:bg-red-500/50 border border-red-500/50"
                    >
                      Disconnetti
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </Glow>
          </>
        ) : (
          /* Not Connected State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Glow color="emerald" intensity="medium">
              <Card>
                <div className="text-center space-y-8 py-16">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl"
                  >
                    𝚪
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-white">Connetti il Tuo Wallet</h3>
                    <p className="text-white/50 max-w-sm mx-auto text-sm mb-2">
                      Accedi al tuo portafoglio MetaMask per gestire i tuoi asset su Base
                      Mainnet e accedere alle funzionalità complete della piattaforma
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="bg-red-500/20 border border-red-500/50 rounded-lg p-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-red-300 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Connect Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={connect}
                      variant="primary"
                      size="lg"
                      loading={isLoading}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"
                    >
                      {isLoading ? 'Connessione in Corso...' : 'Connetti MetaMask'}
                    </Button>
                  </motion.div>

                  {/* Help Text */}
                  {!error && (
                    <p className="text-white/50 text-sm">
                      Non hai MetaMask?{' '}
                      <a
                        href="https://metamask.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500 hover:text-emerald-400 font-semibold underline"
                      >
                        Installalo qui
                      </a>
                    </p>
                  )}
                </div>
              </Card>
            </Glow>
          </motion.div>
        )}

        {/* Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-bold mb-4 text-white">Informazioni Importanti</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Assicurati di avere MetaMask installato nel tuo browser</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Questo wallet opera sulla rete Base Mainnet (chainId: 8453)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Tutti i saldi vengono sincronizzati in tempo reale</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">✓</span>
                <span>I tuoi dati rimangono privati e sicuri - nulla viene archiviato su server</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
