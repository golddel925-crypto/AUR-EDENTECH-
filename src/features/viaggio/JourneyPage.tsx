import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { Card } from '../../components/ui/Card'
import { Glow } from '../../components/ui/Glow'
import { JourneyStep } from './JourneyStep'
import { rpcFunctions } from '../../core/rpc'
import { PageHeader } from '../../components/ui/PageHeader'

export const JourneyPage: React.FC = () => {
  const { data: steps, isLoading } = useQuery({
    queryKey: ['journey_steps'],
    queryFn: async () => {
      try {
        const data = await rpcFunctions.fetchJourneySteps('')
        return Array.isArray(data) ? data : []
      } catch (err) {
        console.error('Failed to load journey steps:', err)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })

  const defaultSteps = [
    { id: '1', title: 'Iniziazione', description: 'Primi passi nel viaggio di evoluzione', completed: true },
    { id: '2', title: 'Consapevolezza', description: 'Sviluppo della consapevolezza personale', completed: true },
    { id: '3', title: 'Crescita', description: 'Fase di crescita e apprendimento attivo', completed: false },
    { id: '4', title: 'Integrazione', description: 'Integrazione delle esperienze nel percorso', completed: false },
  ]

  const stepsToDisplay = steps && steps.length > 0 ? steps : defaultSteps

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <PageHeader
          title="VIAGGIO"
          subtitle="Il tuo percorso di evoluzione personale"
        />

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Vertical Glow Line */}
          <motion.div
            className="absolute left-0 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-yellow-400 to-emerald-500 rounded-full"
            animate={{
              boxShadow: [
                '0 0 12px rgba(80, 200, 120, 0.4)',
                '0 0 24px rgba(80, 200, 120, 0.8)',
                '0 0 12px rgba(80, 200, 120, 0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Steps Container */}
          <div className="space-y-8 pl-8 sm:pl-32">
            {stepsToDisplay && stepsToDisplay.length > 0 ? (
              stepsToDisplay.map((step: any, index: number) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  {/* Step Node */}
                  <motion.div
                    className="absolute -left-5 sm:-left-14 top-6 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black"
                    whileHover={{ scale: 1.3 }}
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(80, 200, 120, 0.5)',
                        '0 0 16px rgba(80, 200, 120, 0.9)',
                        '0 0 8px rgba(80, 200, 120, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />

                  {/* Step Card */}
                  <Glow
                    color={step.completed ? 'emerald' : 'gold'}
                    intensity={step.completed ? 'medium' : 'low'}
                  >
                    <Card
                      className={`${
                        step.completed
                          ? 'bg-black/40 border-emerald-500/50'
                          : 'bg-black/20 border-white/20 opacity-70'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-bold mb-2 ${
                            step.completed ? 'text-emerald-500' : 'text-white/70'
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-white/50 text-sm">
                            {step.description}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <motion.div
                          animate={{
                            scale: step.completed ? 1 : 0.95,
                            opacity: step.completed ? 1 : 0.5,
                          }}
                          className={`ml-4 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            step.completed
                              ? 'bg-emerald-500/30 text-emerald-400'
                              : 'bg-white/10 text-white/50'
                          }`}
                        >
                          {step.completed ? '✓ Completato' : 'In Corso'}
                        </motion.div>
                      </div>

                      {/* Progress Bar - if in progress */}
                      {!step.completed && (
                        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-yellow-400"
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </div>
                      )}
                    </Card>
                  </Glow>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <div className="text-center py-12">
                    <p className="text-white/50 mb-4">Il tuo viaggio inizierà presto</p>
                    <p className="text-white/30 text-sm">
                      Completa azioni per sbloccare i passaggi successivi
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        {stepsToDisplay.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-bold">Progressione Totale</p>
                <p className="text-emerald-500 font-bold">
                  {Math.round(
                    (stepsToDisplay.filter((s: any) => s.completed).length /
                      stepsToDisplay.length) *
                      100
                  )}%
                </p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-yellow-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (stepsToDisplay.filter((s: any) => s.completed).length /
                        stepsToDisplay.length) *
                      100
                    }%`,
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
