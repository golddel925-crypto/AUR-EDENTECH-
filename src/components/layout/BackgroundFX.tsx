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
      <div className="absolute inset-0 bg-black/95" />

      {/* Subtle radial vignette for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(80,200,120,0.02), transparent 30%)'
      }} />

      {/* SVG Circuits and Root Patterns */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
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
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.18, 0.45, 0.18] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        />
        <motion.line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, delay: 3 }}
        />

        {/* Vertical circuit lines */}
        <motion.line
          x1="25%"
          y1="0"
          x2="25%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 19, repeat: Infinity, delay: 4 }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.18, 0.5, 0.18] }}
          transition={{ duration: 21, repeat: Infinity, delay: 2.5 }}
        />
        <motion.line
          x1="75%"
          y1="0"
          x2="75%"
          y2="100%"
          stroke="url(#circuitGrad)"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 23, repeat: Infinity, delay: 3.2 }}
        />

        {/* Root patterns - branching lines */}
        {/* Left root */}
        <motion.polyline
          points="15%,0 15%,30% 10%,45% 5%,70% 2%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 26, repeat: Infinity, delay: 2 }}
        />
        <motion.polyline
          points="15%,0 15%,30% 20%,45% 25%,70% 28%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.16, 0.38, 0.16] }}
          transition={{ duration: 24, repeat: Infinity, delay: 3 }}
        />

        {/* Center root */}
        <motion.polyline
          points="50%,0 50%,35% 48%,50% 45%,75% 42%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 25, repeat: Infinity, delay: 2.5 }}
        />
        <motion.polyline
          points="50%,0 50%,35% 52%,50% 55%,75% 58%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.16, 0.36, 0.16] }}
          transition={{ duration: 22, repeat: Infinity, delay: 3.2 }}
        />

        {/* Right root */}
        <motion.polyline
          points="85%,0 85%,30% 80%,45% 75%,70% 72%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 24, repeat: Infinity, delay: 2.8 }}
        />
        <motion.polyline
          points="85%,0 85%,30% 90%,45% 95%,70% 98%,100%"
          fill="none"
          stroke="url(#rootGrad)"
          strokeWidth="0.8"
          animate={{ opacity: [0.14, 0.34, 0.14] }}
          transition={{ duration: 26, repeat: Infinity, delay: 3.5 }}
        />
      </svg>

      {/* Pulsing emerald nodes */}
      {[
        { x: '15%', y: '25%', delay: 0 },
        { x: '45%', y: '35%', delay: 1.2 },
        { x: '70%', y: '45%', delay: 2.4 },
        { x: '25%', y: '65%', delay: 3.6 },
        { x: '60%', y: '75%', delay: 4.8 },
        { x: '80%', y: '20%', delay: 2 },
        { x: '35%', y: '85%', delay: 3 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald"
          style={{ left: node.x, top: node.y, zIndex: -40, opacity: 0.8 }}
          animate={{
            boxShadow: [
              '0 0 8px rgba(80, 200, 120, 0.25)',
              '0 0 20px rgba(80, 200, 120, 0.6)',
              '0 0 8px rgba(80, 200, 120, 0.25)',
            ],
            transform: ['translateY(0px)', 'translateY(-6px)', 'translateY(0px)'],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Energy particles (blue/ purple/ magenta) drifting slowly */}
      {[
        { color: 'blue-energy', startX: '10%', startY: '10%', dx: '80%', dy: '30%', delay: 0 },
        { color: 'purple-network', startX: '80%', startY: '20%', dx: '-70%', dy: '60%', delay: 6 },
        { color: 'magenta-impulse', startX: '50%', startY: '90%', dx: '-40%', dy: '-80%', delay: 12 },
      ].map((p, idx) => (
        <motion.div
          key={idx}
          className={`absolute w-1.5 h-1.5 rounded-full`}
          style={{ left: p.startX, top: p.startY, zIndex: -50, background: idx===0? '#3A86FF': idx===1? '#8338EC':'#FF006E', opacity: 0.12 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 80, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}
