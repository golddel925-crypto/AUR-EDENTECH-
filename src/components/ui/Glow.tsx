import React from 'react'
import { motion } from 'framer-motion'

interface GlowProps {
  children: React.ReactNode
  color?: 'emerald' | 'gold'
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
    emerald: 'rgba(80, 200, 120, 0.3)',
    gold: 'rgba(255, 215, 0, 0.3)',
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
          `0 0 ${intensityMap[intensity]} ${colorMap[color]}`,
          `0 0 ${parseInt(intensityMap[intensity]) * 1.5}px ${colorMap[color]}`,
          `0 0 ${intensityMap[intensity]} ${colorMap[color]}`,
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
