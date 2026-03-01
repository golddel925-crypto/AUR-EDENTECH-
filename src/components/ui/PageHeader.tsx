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
    <h1 className="text-4xl font-bold text-gradient">{title}</h1>
    {subtitle && (
      <p className="text-white/60 mt-1 text-sm">
        {subtitle}
      </p>
    )}
  </div>
)
