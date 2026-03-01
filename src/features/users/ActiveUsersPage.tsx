import React from 'react'
import { motion } from 'framer-motion'
import { ActiveUsers } from './ActiveUsers'
import { PageHeader } from '../../components/ui/PageHeader'

export const ActiveUsersPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <PageHeader
          title="UTENTI ATTIVI"
          subtitle="Comunità online in questo momento"
        />

        <ActiveUsers />
      </motion.div>
    </div>
  )
}
