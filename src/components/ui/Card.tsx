import React from 'react'

interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  className = '',
  children,
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-black border border-emerald/20 rounded-lg p-6
        transition-fast
        ${hoverable ? 'hover:border-emerald/50 hover:shadow-lg hover:shadow-emerald/20' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
