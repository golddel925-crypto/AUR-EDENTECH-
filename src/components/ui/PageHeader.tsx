import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => (
  <div className={`mb-6 ${className}`}>
    <h1 className="text-4xl font-bold text-white">{title}</h1>
    {subtitle && <p className="text-white/50 mt-1">{subtitle}</p>}
  </div>
)
