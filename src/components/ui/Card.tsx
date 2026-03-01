import React from 'react'

interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  hoverable?: boolean
  borderColor?: string
}

export const Card: React.FC<CardProps> = ({
  className = '',
  children,
  onClick,
  hoverable = false,
  borderColor,
}) => {
  return (
    <div
      className={`
        bg-black
        ${borderColor ? borderColor : 'border border-yellow-400'}
        rounded-lg p-6
        transition-fast transform
        ${hoverable ? 'hover:shadow-lg hover:shadow-emerald/30 hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
