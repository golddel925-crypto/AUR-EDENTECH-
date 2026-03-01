import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { PageHeader } from '../../components/ui/PageHeader'
import { rpcFunctions } from '../../core/rpc'
import { useSessionStore } from '../../stores/sessionStore'

export const MessagingPage: React.FC = () => {
  const { userId } = useSessionStore()
  const [conversationId, setConversationId] = useState<string | null>(null)

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', conversationId, userId],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchMessages(conversationId || undefined, userId || undefined)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load messages:', err)
        return []
      }
    },
    enabled: !!userId,
    staleTime: 30 * 1000,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-6">
      <PageHeader title="MESSAGGI" subtitle="Conversazioni contestuali" />

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setConversationId(null)}>
            Tutti
          </Button>
          {/* future: list of open conversations */}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="text-emerald-500 text-4xl animate-spin">◎</div>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.length === 0 && (
              <Card>
                <p className="text-white/50 text-center py-8">Nessun messaggio</p>
              </Card>
            )}
            {messages.map((msg: any) => (
              <div key={msg.id} className="p-3 rounded-lg bg-black/60">
                <p className="text-xs text-white/70">
                  <span className="font-semibold">
                    {msg.sender_id === userId ? 'Tu' : msg.sender_id}
                  </span>{' '}
                  <span>{msg.content}</span>
                </p>
                <p className="text-xxs text-white/40 mt-1">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
