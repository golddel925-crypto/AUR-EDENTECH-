import React from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, className = '' }) => {
  return (
    <div className={`bg-black border border-emerald/20 rounded-lg p-4 flex items-center ${className}`}>
      {icon && <div className="mr-3 text-2xl">{icon}</div>}
      <div>
        <div className="text-white/70 text-xs uppercase">{label}</div>
        <div className="text-2xl font-bold text-yellow-400">{value}</div>
      </div>
    </div>
  )
}
