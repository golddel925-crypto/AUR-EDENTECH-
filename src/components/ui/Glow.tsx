import React from 'react'
import { motion } from 'framer-motion'

interface GlowProps {
  children: React.ReactNode
  color?: 'emerald' | 'gold' | 'blue-energy' | 'purple-network' | 'magenta-impulse'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export const Glow: React.FC<GlowProps> = ({
  children,
  color = 'emerald',
  intensity = 'medium',
  className = '',
}) => {
  const colorMap = {
    emerald: 'var(--glow-emerald)',
    gold: 'var(--glow-gold)',
    'blue-energy': 'var(--glow-energy)',
    'purple-network': 'rgba(131,56,236,0.22)',
    'magenta-impulse': 'rgba(255,0,110,0.2)',
  }

  const intensityMap = {
    low: '10px',
    medium: '20px',
    high: '30px',
  }

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 8px 24px -8px ${colorMap[color]}`,
          `0 16px 48px -20px ${colorMap[color]}`,
          `0 8px 24px -8px ${colorMap[color]}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
