import React from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { useUser } from '../../hooks/useUser'
import { Card } from '../../components/ui/Card'
import { rpcFunctions } from '../../core/rpc'
import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '../../stores/sessionStore'

export const UniversePage: React.FC = () => {
  const { profile } = useUser()
  const { userId } = useSessionStore()

  const { data: walletInfo, isLoading: walletLoading } = useQuery({
    queryKey: ['walletInfo', userId],
    queryFn: async () => {
      if (!userId) return null
      try {
        return await rpcFunctions.fetchWalletInfo(userId)
      } catch (err) {
        console.error('Failed to fetch wallet info', err)
        return null
      }
    },
    enabled: !!userId,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
      <PageHeader title="UNIVERSO PERSONALE" subtitle="Il tuo controllo totale" />

      <Card>
        <h3 className="text-lg font-bold text-emerald-300 mb-2">Identità</h3>
        <p className="text-white/70">Nome pubblico: {profile?.publicName}</p>
        <p className="text-white/70">ID: {profile?.id}</p>
        <p className="text-white/70">Bio: {profile?.bio || '—'}</p>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-emerald-300 mb-2">Wallet</h3>
        {walletLoading ? (
          <p className="text-white/50">Caricamento...</p>
        ) : (
          <p className="text-white/70">
            {walletInfo?.wallet_address || 'Nessun wallet collegato'}
          </p>
        )}
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-emerald-300 mb-2">Impostazioni & Analisi</h3>
        <p className="text-white/70">(traccia, configura, osserva tutto)</p>
      </Card>
    </div>
  )
}
