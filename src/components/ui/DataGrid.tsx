import React from 'react'

interface DataGridProps {
  children: React.ReactNode
  cols?: number
  gap?: string
  className?: string
}

export const DataGrid: React.FC<DataGridProps> = ({
  children,
  cols = 3,
  gap = 'gap-4',
  className = '',
}) => {
  return (
    <div
      className={`grid ${gap} ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {children}
    </div>
  )
}
