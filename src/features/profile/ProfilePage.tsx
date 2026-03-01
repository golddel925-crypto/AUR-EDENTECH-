import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Glow } from '../../components/ui/Glow'
import { PageHeader } from '../../components/ui/PageHeader'
import { useUser } from '../../hooks/useUser'
import { useSessionStore } from '../../stores/sessionStore'
import { rpcFunctions } from '../../core/rpc'
import { useUIStore } from '../../stores/uiStore'
import { AvatarUpload } from './AvatarUpload'
import { EditName } from './EditName'

type TabType = 'identity' | 'evolution' | 'personalization'

export const ProfilePage: React.FC = () => {
  const { profile, isLoading } = useUser()
  const { userId } = useSessionStore()
  const { addNotification } = useUIStore()
  const [activeTab, setActiveTab] = useState<TabType>('identity')

  // Fetch badges for evolution tab
  const { data: badges = [] } = useQuery({
    queryKey: ['badges', userId],
    queryFn: async () => {
      try {
        if (!userId) return []
        const data = await rpcFunctions.fetchBadges(userId)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load badges:', err)
        return []
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  })

  // Fetch posts count for evolution tab
  const { data: posts = [] } = useQuery({
    queryKey: ['posts', 0],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchPosts(100, 0)
        return Array.isArray(data) ? data : []
      } catch (err) {
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  const tabs = [
    { id: 'identity', label: 'IDENTITÀ' },
    { id: 'evolution', label: 'EVOLUZIONE' },
    { id: 'personalization', label: 'PERSONALIZZAZIONE' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="text-emerald-500 text-4xl">◎</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <PageHeader title="PROFILO" subtitle="Gestisci la tua identità digitale" />

        {/* Tabs */}
        <div className="flex gap-1 border-b border-emerald-500/30">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-3 font-bold text-xs transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-yellow-400 border-yellow-400'
                  : 'text-white/50 border-transparent hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* IDENTITY TAB */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              {/* Avatar Card */}
              <Glow color="emerald" intensity="medium">
                <Card>
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-6 text-white">Avatar</h3>
                    <div className="mb-6 flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-yellow-400 flex items-center justify-center text-5xl font-bold text-black border-2 border-yellow-400"
                      >
                        {profile?.publicName?.[0]?.toUpperCase() || 'A'}
                      </motion.div>
                    </div>
                    <AvatarUpload />
                  </div>
                </Card>
              </Glow>

              {/* Name Card */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Nome Pubblico</h3>
                <EditName currentName={profile?.public_name || profile?.publicName || ''} />
              </Card>

              {/* Sequence ID */}
              <Card>
                <div className="space-y-2">
                  <p className="text-white/50 text-xs font-semibold">SEQUENCE ID</p>
                  <p className="font-mono text-emerald-500 text-sm break-all">
                    {profile?.id?.slice(0, 24)}...
                  </p>
                </div>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <div className="text-center">
                    <p className="text-yellow-400 text-3xl font-bold">{profile?.coinBalance || 0}</p>
                    <p className="text-white/50 text-xs mt-2">COIN CANCELLIERI</p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-emerald-500 text-3xl font-bold">{badges.length}</p>
                    <p className="text-white/50 text-xs mt-2">PREMI TOTALI</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* EVOLUTION TAB */}
          {activeTab === 'evolution' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Glow color="emerald" intensity="low">
                  <Card>
                    <div className="text-center py-4">
                      <p className="text-emerald-500 text-4xl font-bold">{badges.length}</p>
                      <p className="text-white/50 text-xs mt-3">BADGE COMPLETATI</p>
                      <div className="mt-3 h-1 bg-emerald-500/30 rounded-full relative overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(badges.length * 10, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </Card>
                </Glow>

                <Glow color="emerald" intensity="low">
                  <Card>
                    <div className="text-center py-4">
                      <p className="text-yellow-400 text-4xl font-bold">{posts.length}</p>
                      <p className="text-white/50 text-xs mt-3">POST CREATI</p>
                      <div className="mt-3 h-1 bg-yellow-400/30 rounded-full relative overflow-hidden">
                        <motion.div
                          className="h-full bg-yellow-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(posts.length * 5, 100)}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </Card>
                </Glow>
              </div>

              {/* Journey Progress */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Progressione Viaggio</h3>
                <div className="space-y-3">
                  {[
                    { step: '1. Iniziazione', progress: 100 },
                    { step: '2. Crescita', progress: 60 },
                    { step: '3. Integrazione', progress: 30 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p className="text-white/70 text-sm mb-2">{item.step}</p>
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-emerald-500/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-yellow-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                      <p className="text-white/40 text-xs mt-1">{item.progress}%</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Badges */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Premi Recenti</h3>
                {badges.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {badges.slice(0, 8).map((badge, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center"
                      >
                        <span className="text-emerald-500 font-bold">{badge.level?.[0]}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/30 text-center py-6">Nessun premio ancora guadagnato</p>
                )}
              </Card>
            </div>
          )}

          {/* PERSONALIZATION TAB */}
          {activeTab === 'personalization' && (
            <div className="space-y-6">
              {/* Bio */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Bio</h3>
                <textarea
                  placeholder="Racconta qualcosa su di te..."
                  maxLength={300}
                  defaultValue=""
                  className="w-full h-24 bg-black/50 border border-emerald-500/30 text-white placeholder-white/50 px-4 py-3 rounded-lg focus:border-emerald-500 focus:outline-none transition-all"
                />
                <p className="text-white/50 text-xs mt-2">Max 300 caratteri</p>
              </Card>

              {/* Avatar Theme */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Avatar Frame</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Gold', color: 'from-yellow-400 to-yellow-600' },
                    { name: 'Emerald', color: 'from-emerald-500 to-emerald-700' },
                    { name: 'Hybrid', color: 'from-emerald-500 to-yellow-400' },
                  ].map((theme) => (
                    <motion.button
                      key={theme.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        theme.name === 'Hybrid'
                          ? 'border-yellow-400 bg-yellow-400/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${theme.color} mx-auto mb-2`} />
                      <p className="text-white text-sm font-semibold">{theme.name}</p>
                    </motion.button>
                  ))}
                </div>
              </Card>

              {/* Theme Preference */}
              <Card>
                <h3 className="text-lg font-bold mb-4 text-white">Preferenze Tema</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-white/70 text-sm">Dark Mode (default)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-white/70 text-sm">Animazioni ridotte</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-white/70 text-sm">Alto Contrasto</span>
                  </label>
                </div>
              </Card>

              {/* Save Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  onClick={() => {
                    addNotification('Impostazioni salvate!', 'success')
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3"
                >
                  SALVA IMPOSTAZIONI
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
