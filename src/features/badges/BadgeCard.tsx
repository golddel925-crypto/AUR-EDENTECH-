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
      whileHover={earned ? { scale: 1.05 } : {}}
      className={`${minimal ? 'h-full' : 'h-32'}`}
    >
      <Card
        className={`h-full flex flex-col items-center justify-center ${
          !earned ? 'opacity-40' : ''
        }`}
        hoverable={earned}
      >
        {/* Badge Symbol */}
        <motion.div
          className={`text-4xl mb-2 bg-gradient-to-br ${
            LEVEL_COLORS[level]
          } bg-clip-text text-transparent`}
          animate={earned ? { scale: [1, 1.1, 1] } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
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

        {/* Earned indicator */}
        {earned && minimal && (
          <span className="text-xs text-emerald font-semibold">✓</span>
        )}
      </Card>
    </motion.div>
  )
}
