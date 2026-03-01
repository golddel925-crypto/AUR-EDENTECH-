import React from 'react'
import { motion } from 'framer-motion'
import { ActiveUsers } from './ActiveUsers'

export const ActiveUsersPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">UTENTI ATTIVI</h1>
          <p className="text-white/50">Comunità online in questo momento</p>
        </div>

        {/* Users List */}
        <ActiveUsers />
      </motion.div>
    </div>
  )
}
