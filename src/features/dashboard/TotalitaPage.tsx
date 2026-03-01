import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { Glow } from '../../components/ui/Glow'
import { BadgeCard } from '../badges/BadgeCard'
import { PostCard } from '../forum/PostCard'
import { useUser } from '../../hooks/useUser'
import { rpcFunctions } from '../../core/rpc'
import { useSessionStore } from '../../stores/sessionStore'

const BADGE_CATEGORIES = [
  { id: 'evolution', label: 'Evoluzione', color: 'from-emerald' },
  { id: 'cooperation', label: 'Cooperazione', color: 'from-gold' },
  { id: 'ethics', label: 'Etica', color: 'from-emerald' },
  { id: 'impact', label: 'Impatto', color: 'from-gold' },
]

const BADGE_LEVELS = ['Bronze', 'Silver']

export const TotalitaPage: React.FC = () => {
  const { profile, isLoading: profileLoading } = useUser()
  const { userId } = useSessionStore()

  // Fetch posts for center column
  const { data: postsData = [], isLoading: postsLoading } = useQuery({
    queryKey: ['posts', 0],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchPosts(5, 0)
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load posts:', err)
        return []
      }
    },
    staleTime: 2 * 60 * 1000,
  })

  // Fetch badges for right column
  const { data: badges = [], isLoading: badgesLoading } = useQuery({
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

  const isLoading = profileLoading || postsLoading || badgesLoading

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT COLUMN - Profile */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Glow color="emerald" intensity="medium">
            <Card className="h-full">
              <div className="text-center">
                {/* Avatar - Large */}
                <motion.div
                  className="mb-6 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-yellow-400 flex items-center justify-center text-5xl font-bold text-black border-2 border-yellow-400">
                      {profile?.publicName?.[0]?.toUpperCase() || 'A'}
                    </div>
                  </div>
                </motion.div>

                {/* Name */}
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {profile?.publicName || 'Anonymous'}
                </h2>

                {/* ID */}
                <p className="text-white/50 text-xs mb-6 tracking-wider">
                  {profile?.id?.slice(0, 8)}...
                </p>

                <div className="border-t border-b border-emerald-500/30 py-6 my-6">
                  {/* Coin Balance */}
                  <div className="mb-4">
                    <p className="text-white/50 text-xs mb-2 font-semibold">COIN CANCELLIERI</p>
                    <div className="text-4xl font-bold text-yellow-400">
                      {profile?.coinBalance || 0}
                    </div>
                  </div>

                  {/* Joined Date */}
                  <p className="text-white/50 text-xs mb-1">Membro dal</p>
                  <p className="text-emerald-500 text-sm font-semibold">
                    {profile?.joinedAt
                      ? new Date(profile.joinedAt).toLocaleDateString('it-IT')
                      : 'N/A'}
                  </p>
                </div>

                {/* Recent Badges - 3-4 shown */}
                <div>
                  <p className="text-white/50 text-xs mb-4 font-semibold">PREMI RECENTI</p>
                  <div className="grid grid-cols-3 gap-2">
                    {badges.slice(0, 3).map((badge, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <BadgeCard
                          category={badge.category || 'evolution'}
                          level={badge.level || 'Bronze'}
                          earned={true}
                          minimal={true}
                        />
                      </motion.div>
                    ))}
                    {badges.length === 0 && (
                      <p className="text-white/30 text-xs col-span-3">Nessun premio ancora</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </Glow>
        </motion.div>

        {/* CENTER COLUMN - Forum Preview */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="space-y-4 h-full">
            <div>
              <h3 className="text-2xl font-bold text-emerald-500 mb-1">FORUM</h3>
              <p className="text-white/50 text-xs">Ultimi post della community</p>
            </div>

            <div className="space-y-3 flex-1">
              {postsData.slice(0, 3).map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostCard post={post} minimal={true} />
                </motion.div>
              ))}

              {postsData.length === 0 && (
                <Card>
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-white/30 text-sm italic">
                      Nessun post ancora. Sii il primo!
                    </div>
                  </motion.div>
                </Card>
              )}
            </div>

            {postsData.length > 3 && (
              <motion.div
                whileHover={{ x: 4 }}
                className="text-emerald-500 text-xs font-semibold cursor-pointer"
              >
                Visualizza tutto →
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Badges Categories */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="space-y-4 h-full">
            <div>
              <h3 className="text-2xl font-bold text-emerald-500 mb-1">PREMI</h3>
              <p className="text-white/50 text-xs">Categorie di evoluzione</p>
            </div>

            <div className="space-y-5">
              {BADGE_CATEGORIES.map((category, catIdx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: catIdx * 0.05 }}
                >
                  <div>
                    <p className="text-white/70 text-xs font-semibold mb-2">{category.label}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {BADGE_LEVELS.map((level, lvlIdx) => {
                        const earned = badges.some(
                          (b: any) => b.category === category.id && b.level === level
                        )
                        return (
                          <motion.div
                            key={`${category.id}-${level}`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <BadgeCard
                              category={category.id}
                              level={level}
                              earned={earned}
                              minimal={true}
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
