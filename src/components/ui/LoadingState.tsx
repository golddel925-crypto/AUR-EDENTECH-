import React from 'react'
import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
  className?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center text-white/50 py-16 ${className}`}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-4xl mb-4"
    >
      ⟳
    </motion.div>
    <div className="text-sm">{message}</div>
  </div>
)
