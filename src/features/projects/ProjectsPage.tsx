import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { rpcFunctions } from '../../core/rpc'

export const ProjectsPage: React.FC = () => {
  const [spaceId, setSpaceId] = useState<string | null>(null)
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects', spaceId],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchProjects(spaceId || undefined)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load projects:', err)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <PageHeader title="PROGETTI" subtitle="Crea, collabora, condividi" />

      {/* Optionally filter by space - left as hook for further enhancements */}
      <div className="mb-6">
        {/* placeholder select for spaces if needed */}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="text-emerald-500 text-4xl animate-spin">◎</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && (
            <Card>
              <p className="text-white/50 text-center py-8">
                Nessun progetto trovato
              </p>
            </Card>
          )}
          {projects.map((proj: any) => (
            <Card key={proj.id} className="hover:scale-[1.02] transition-transform">
              <h4 className="text-lg font-semibold text-emerald-300">
                {proj.name || 'Progetto senza titolo'}
              </h4>
              <p className="text-white/60 text-sm mt-1">
                {proj.status || 'Stato non specificato'}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
