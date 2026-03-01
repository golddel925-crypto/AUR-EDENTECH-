import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { DataGrid } from '../../components/ui/DataGrid'
import * as rpcFunctions from '../../core/rpc'

export const ActiveUsers: React.FC = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['activeUsers'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchActiveUsers()
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load active users:', err)
        return []
      }
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000,
  })

  if (isLoading) {
    return (
      <Card>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center py-8"
        >
          <div className="text-emerald text-4xl">◎</div>
        </motion.div>
      </Card>
    )
  }

  const userList = users || []

  return (
    <div className="space-y-4">
      {userList.length > 0 ? (
        <DataGrid cols={1} gap="gap-3" className="sm:grid-cols-2">
          {userList.map((user: any, idx: number) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card hoverable className="flex items-center gap-4 p-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-gold flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {user.public_name?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || 'U'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {user.public_name || user.name || 'Anonimo'}
                  </p>
                  <p className="text-xs text-emerald">
                    {user.status === 'online'
                      ? '● Online'
                      : `● Last seen ${user.last_seen || 'recently'}`}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </DataGrid>
      ) : (
        <Card>
          <p className="text-white/50 text-center py-8">Nessun utente attivo</p>
        </Card>
      )}

      <p className="text-white/50 text-xs text-center">
        {userList.length} utente{userList.length !== 1 ? 'i' : ''} attivo
        {userList.length !== 1 ? 'i' : ''}
      </p>
    </div>
  )
}
