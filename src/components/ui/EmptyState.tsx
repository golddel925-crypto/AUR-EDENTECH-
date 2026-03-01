import React from 'react'

interface EmptyStateProps {
  message?: string
  icon?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'Nessun dato disponibile',
  icon = '∅',
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center text-white/50 py-16 ${className}`}
  >
    <div className="text-6xl mb-4">{icon}</div>
    <div className="text-sm">{message}</div>
  </div>
)
