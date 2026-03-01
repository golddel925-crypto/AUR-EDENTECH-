import React from 'react'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  label?: string
  className?: string
  maxLength?: number
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  name,
  onChange,
  onBlur,
  disabled = false,
  error = '',
  label = '',
  className = '',
  maxLength,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        className={`
          w-full
          bg-black/50 border border-emerald/30
          text-white placeholder-white/50
          px-4 py-3 rounded-lg
          transition-all duration-200
          focus:border-emerald focus:shadow-lg focus:shadow-emerald/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
