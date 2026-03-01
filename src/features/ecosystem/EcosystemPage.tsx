import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { rpcFunctions } from '../../core/rpc'

export const EcosystemPage: React.FC = () => {
  const { data: activity = [], isLoading: activityLoading } = useQuery({
    queryKey: ['ecosystem', 'activity'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchActivity(10, 0)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load ecosystem activity:', err)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
  })

  if (activityLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-emerald-500 text-4xl animate-spin">◎</div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
      <PageHeader title="ECOSISTEMA" subtitle="Lamborghini di dati e relazioni" />

      <Card>
        <h3 className="text-xl font-bold mb-2">Ultime attività</h3>
        <ul className="space-y-2">
          {activity.length === 0 && <li className="text-white/50">Nessuna attività recente</li>}
          {activity.map((act: any) => (
            <li key={act.id} className="text-white/70 text-sm">
              <span className="font-semibold text-emerald-300">
                {act.type || 'azione'}
              </span>{' '}
              {act.description || act.details}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
