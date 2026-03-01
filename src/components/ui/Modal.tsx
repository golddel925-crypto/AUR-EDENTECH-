import React from 'react'
import { useUIStore } from '../../stores/uiStore'

export const Modal: React.FC = () => {
  const { modalContent, hideModal } = useUIStore()

  if (!modalContent) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 glass-bar"
      onClick={hideModal}
    >
      <div
        className="p-6 rounded-lg shadow-2xl max-w-full max-h-full overflow-auto card-deep"
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>
  )
}
