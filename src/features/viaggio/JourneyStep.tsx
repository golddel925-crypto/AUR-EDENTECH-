import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Glow } from '../../components/ui/Glow'

interface JourneyStepProps {
  step: {
    id: string
    title: string
    reflection: string
    media_urls?: string[]
    date?: string
    completed?: boolean
  }
}

export const JourneyStep: React.FC<JourneyStepProps> = ({ step }) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.01 }}
    >
      {/* Node */}
      <Glow color="emerald" intensity="medium">
        <div className="absolute -left-44 top-6 w-16 h-16 rounded-full bg-black border-2 border-emerald flex items-center justify-center">
          <div className="w-2 h-2 bg-emerald rounded-full" />
        </div>
      </Glow>

      {/* Card */}
      <Card className="border-emerald/50">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold mb-1">{step.title}</h3>
            {step.date && (
              <p className="text-emerald text-sm">
                {new Date(step.date).toLocaleDateString('it-IT')}
              </p>
            )}
          </div>

          {/* Reflection */}
          <p className="text-white/70">{step.reflection}</p>

          {/* Media */}
          {step.media_urls && step.media_urls.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {step.media_urls.map((url, idx) => (
                <motion.img
                  key={idx}
                  src={url}
                  alt={`Step media ${idx + 1}`}
                  className="rounded-lg w-full h-32 object-cover border border-emerald/20"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>
          )}

          {/* Status */}
          {step.completed && (
            <div className="pt-4 border-t border-emerald/20">
              <span className="inline-flex items-center gap-2 text-emerald text-sm">
                <span>✓</span> Completato
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
