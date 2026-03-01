import React from 'react'
import { useUIStore } from '../../stores/uiStore'

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useUIStore()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((note) => (
        <div
          key={note.id}
          className={`px-4 py-2 rounded shadow-lg text-sm max-w-xs cursor-pointer transition-opacity bg-black/80 border-l-4 
            ${note.type === 'success' ? 'border-emerald text-emerald-300' : ''}
            ${note.type === 'error' ? 'border-red-500 text-red-300' : ''}
            ${note.type === 'info' ? 'border-blue-500 text-blue-300' : ''}
            ${note.type === 'warning' ? 'border-yellow-500 text-yellow-300' : ''}`}
          onClick={() => removeNotification(note.id)}
        >
          {note.message}
        </div>
      ))}
    </div>
  )
}
