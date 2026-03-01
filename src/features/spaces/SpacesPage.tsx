import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { rpcFunctions } from '../../core/rpc'
import { useUIStore } from '../../stores/uiStore'

export const SpacesPage: React.FC = () => {
  const { showModal } = useUIStore()
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchSpaces()
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load spaces:', err)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <PageHeader title="SPAZI" subtitle="Esplora comunità e progetti" />
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="text-emerald-500 text-4xl animate-spin">◎</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.length === 0 && (
            <Card>
              <p className="text-white/50 text-center py-8">
                Nessuno spazio disponibile
              </p>
            </Card>
          )}
          {spaces.map((space: any) => (
            <Card
              key={space.id}
              className="hover:scale-[1.02] transition-transform cursor-pointer"
              onClick={() =>
                showModal(
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-emerald-300">
                      {space.name}
                    </h3>
                    <p className="text-white/70">{space.description}</p>
                    <p className="text-white/50 text-xs">
                      ID: {space.id}
                    </p>
                  </div>
                )
              }
            >
              <h4 className="text-lg font-semibold text-emerald-300">
                {space.name || 'Spazio senza nome'}
              </h4>
              <p className="text-white/60 text-sm mt-1">
                {space.description || 'Nessuna descrizione'}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
