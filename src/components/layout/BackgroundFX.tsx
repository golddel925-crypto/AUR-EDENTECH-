import React from 'react'
import { motion } from 'framer-motion'

/**
 * Animated background with digital circuits, root patterns, and emerald nodes
 * Opacity 8%, animated slowly
 */
export const BackgroundFX: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 bg-black overflow-hidden">
      {/* Base layer */}
      <div className="absolute inset-0 bg-black" />

      {/* SVG Circuits and Root Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-8" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#50C878" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="rootGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#50C878" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#50C878" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Horizontal circuit lines */}
        <motion.line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />
        <motion.line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 6.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Vertical circuit lines */}
        <motion.line
          x1="25%"
          y1="0"
          x2="25%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.3 }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6.5, repeat: Infinity, delay: 1.2 }}
        />
        <motion.line
          x1="75%"
          y1="0"
          x2="75%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 7.5, repeat: Infinity, delay: 0.8 }}
        />

        {/* Root patterns - branching lines */}
        {/* Left root */}
        <motion.polyline
          points="15%,0 15%,30% 10%,45% 5%,70% 2%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
        />
        <motion.polyline
          points="15%,0 15%,30% 20%,45% 25%,70% 28%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8.5, repeat: Infinity, delay: 1 }}
        />

        {/* Center root */}
        <motion.polyline
          points="50%,0 50%,35% 48%,50% 45%,75% 42%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7.5, repeat: Infinity, delay: 1.5 }}
        />
        <motion.polyline
          points="50%,0 50%,35% 52%,50% 55%,75% 58%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 0.2 }}
        />

        {/* Right root */}
        <motion.polyline
          points="85%,0 85%,30% 80%,45% 75%,70% 72%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7.8, repeat: Infinity, delay: 0.8 }}
        />
        <motion.polyline
          points="85%,0 85%,30% 90%,45% 95%,70% 98%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 8.2, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* Pulsing emerald nodes */}
      {[
        { x: '15%', y: '25%', delay: 0 },
        { x: '45%', y: '35%', delay: 0.6 },
        { x: '70%', y: '45%', delay: 1.2 },
        { x: '25%', y: '65%', delay: 1.8 },
        { x: '60%', y: '75%', delay: 2.4 },
        { x: '80%', y: '20%', delay: 1 },
        { x: '35%', y: '85%', delay: 1.6 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald"
          style={{ left: node.x, top: node.y, zIndex: -40 }}
          animate={{
            boxShadow: [
              '0 0 6px rgba(80, 200, 120, 0.4)',
              '0 0 16px rgba(80, 200, 120, 0.9)',
              '0 0 6px rgba(80, 200, 120, 0.4)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: node.delay }}
        />
      ))}
    </div>
  )
}
