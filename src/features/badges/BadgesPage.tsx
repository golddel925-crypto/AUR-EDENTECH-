import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { Glow } from '../../components/ui/Glow'
import { BadgeCard } from './BadgeCard'
import { rpcFunctions } from '../../core/rpc'
import { useSessionStore } from '../../stores/sessionStore'

interface BadgesPageProps {
  minimal?: boolean
}

const BADGE_CATEGORIES = [
  { id: 'evolution', label: 'Evoluzione', color: 'from-emerald-500' },
  { id: 'cooperation', label: 'Cooperazione', color: 'from-yellow-400' },
  { id: 'ethics', label: 'Etica', color: 'from-emerald-500' },
  { id: 'impact', label: 'Impatto', color: 'from-yellow-400' },
]

const BADGE_LEVELS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Legendary']

export const BadgesPage: React.FC<BadgesPageProps> = ({ minimal = false }) => {
  const { userId } = useSessionStore()
  const { data: badges, isLoading } = useQuery({
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

  const userBadges = badges || []

  if (minimal) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-emerald-500">Premi</h3>
        <div className="grid grid-cols-3 gap-2">
          {BADGE_CATEGORIES.map((cat) =>
            BADGE_LEVELS.slice(0, 2).map((level) => (
              <motion.div
                key={`${cat.id}-${level}`}
                whileHover={{ scale: 1.05 }}
              >
                <BadgeCard
                  category={cat.id}
                  level={level}
                  earned={false}
                  minimal={true}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    )
  }

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">PREMI</h1>
          <p className="text-white/50">Dimostra il tuo impatto e la tua evoluzione nella comunità</p>
        </div>

        {/* Stats */}
        {userBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            <Glow color="emerald" intensity="low">
              <Card>
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-500">{userBadges.length}</p>
                  <p className="text-white/50 text-xs mt-2">BADGE COMPLETATI</p>
                </div>
              </Card>
            </Glow>
            <Glow color="emerald" intensity="low">
              <Card>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-400">{Math.round((userBadges.length / (BADGE_CATEGORIES.length * BADGE_LEVELS.length)) * 100)}</p>
                  <p className="text-white/50 text-xs mt-2">% COMPLETAMENTO</p>
                </div>
              </Card>
            </Glow>
            <Glow color="emerald" intensity="low">
              <Card>
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-500">{BADGE_CATEGORIES.length}</p>
                  <p className="text-white/50 text-xs mt-2">CATEGORIE</p>
                </div>
              </Card>
            </Glow>
          </motion.div>
        )}

        {/* Categories Grid */}
        <div className="space-y-12">
          {BADGE_CATEGORIES.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">{category.label}</h2>
                <div className={`h-1 flex-1 bg-gradient-to-r ${category.color} to-transparent opacity-50`} />
              </div>

              {/* Badge Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {BADGE_LEVELS.map((level, lvlIndex) => {
                  const earned = userBadges.some(
                    (b: any) => b.category === category.id && b.level === level
                  )

                  return (
                    <motion.div
                      key={`${category.id}-${level}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: catIndex * 0.1 + lvlIndex * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={earned ? { scale: 1.08 } : { scale: 1.02 }}
                      whileTap={earned ? { scale: 0.95 } : {}}
                    >
                      {earned ? (
                        <Glow color="emerald" intensity="medium">
                          <BadgeCard
                            category={category.id}
                            level={level}
                            earned={true}
                          />
                        </Glow>
                      ) : (
                        <BadgeCard
                          category={category.id}
                          level={level}
                          earned={false}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {userBadges.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🏅</div>
                <h3 className="text-xl font-bold mb-2 text-white">Nessun premio ancora</h3>
                <p className="text-white/50 max-w-md mx-auto">
                  Inizia a partecipare nella comunità, completa post e crea connessioni per guadagnare badge
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="font-bold mb-3 text-white">Come Guadagnare Badge</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
              {[
                { cat: 'Evoluzione', desc: 'Completa il tuo profilo e il tuo viaggio' },
                { cat: 'Cooperazione', desc: 'Collabora e aiuta altri membri' },
                { cat: 'Etica', desc: 'Mantieni comportamenti etici e costruttivi' },
                { cat: 'Impatto', desc: 'Crea post e contributi di valore' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-white">{item.cat}</p>
                    <p className="text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
