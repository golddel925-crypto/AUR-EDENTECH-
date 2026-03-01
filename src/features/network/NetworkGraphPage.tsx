import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { rpcFunctions } from '../../core/rpc'
import { PageHeader } from '../../components/ui/PageHeader'

export const NetworkGraphPage: React.FC = () => {
  const { data: connections = [], isLoading } = useQuery({
    queryKey: ['network'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchNetwork()
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load network:', err)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className="w-full h-full">
      <PageHeader title="RETE" subtitle="Mappa delle connessioni" />
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="text-emerald-500 text-4xl animate-spin">◎</div>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
          {/* placeholder network map - real graph requires an external library or custom canvas logic */}
          <div className="text-white/50 italic">Network graph rendering not available</div>
        </div>
      )}
    </div>
  )
}
