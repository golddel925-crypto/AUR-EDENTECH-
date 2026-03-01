import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'

interface BadgeCardProps {
  category: string
  level: string
  earned: boolean
  minimal?: boolean
}

const BADGE_SYMBOLS: Record<string, string> = {
  evolution: '◆',
  cooperation: '◊',
  ethics: '★',
  impact: '◎',
}

const LEVEL_COLORS: Record<string, string> = {
  Bronze: 'from-amber-700 to-amber-600',
  Silver: 'from-slate-400 to-slate-300',
  Gold: 'from-yellow-500 to-yellow-400',
  Platinum: 'from-blue-300 to-cyan-300',
  Legendary: 'from-purple-500 to-pink-500',
}

export const BadgeCard: React.FC<BadgeCardProps> = ({
  category,
  level,
  earned,
  minimal = false,
}) => {
  return (
    <motion.div
      whileHover={earned ? { scale: 1.06, rotateZ: 0.5 } : { scale: 1.02 }}
      className={`${minimal ? 'h-full' : 'h-36'}`}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 800 }}>
        <motion.div
          className={`relative w-full h-full flex flex-col items-center justify-center ${!earned ? 'opacity-40' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
          animate={earned ? { rotateY: [0, 6, -4, 0], translateZ: [0, 6, 2, 0] } : {}}
          transition={{ duration: 1.4 }}
        >
          <Card
            className={`h-full flex flex-col items-center justify-center transform-gpu`}
            hoverable={earned}
          >
            {/* Badge Symbol (3D look) */}
            <motion.div
              className={`text-5xl mb-2 bg-gradient-to-br ${LEVEL_COLORS[level]} bg-clip-text text-transparent`}
              initial={{ scale: 0.9 }}
              animate={earned ? { scale: [0.95, 1.12, 1], rotateZ: [0, 4, 0] } : { scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              {BADGE_SYMBOLS[category] || '◎'}
            </motion.div>

            {/* Level */}
            {!minimal && (
              <>
                <p className="text-xs font-semibold text-white/70">{level}</p>
                {!earned && (
                  <span className="text-xs text-white/50 mt-1">Bloccato</span>
                )}
              </>
            )}

            {/* Earned minimal indicator */}
            {earned && minimal && (
              <span className="text-xs text-emerald font-semibold">✓</span>
            )}
          </Card>

          {/* Earned particle burst */}
          {earned && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-emerald"
                  style={{
                    left: '50%',
                    top: '40%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.9,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0.9 }}
                  animate={{
                    x: (Math.cos((i / 8) * Math.PI * 2) * 48).toString() + 'px',
                    y: (Math.sin((i / 8) * Math.PI * 2) * 32).toString() + 'px',
                    opacity: [0.9, 0.2],
                  }}
                  transition={{ duration: 0.9, delay: 0.05 * i }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
