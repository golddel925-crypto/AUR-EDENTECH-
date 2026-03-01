import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { rpcFunctions } from '../../core/rpc'

export const ActivityPage: React.FC = () => {
  const { data: activity = [], isLoading } = useQuery({
    queryKey: ['activity'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchActivity(50, 0)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load activity:', err)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-6">
      <PageHeader title="ATTIVITÀ" subtitle="Timeline del sistema" />
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="text-emerald-500 text-4xl animate-spin">◎</div>
        </div>
      ) : (
        <div className="space-y-4">
          {activity.length === 0 && (
            <Card>
              <p className="text-white/50 text-center py-8">
                Nessuna attività registrata
              </p>
            </Card>
          )}
          {activity.map((act: any) => (
            <Card key={act.id} className="p-4">
              <p className="text-sm text-white/80">
                <span className="font-semibold text-emerald-300">{act.type}</span>{' '}
                {act.description || act.details}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {new Date(act.created_at).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
