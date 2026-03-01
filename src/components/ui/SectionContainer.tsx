import React from 'react'

interface SectionContainerProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <section className={`space-y-4 ${className}`}> 
      {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
      <div>{children}</div>
    </section>
  )
}
