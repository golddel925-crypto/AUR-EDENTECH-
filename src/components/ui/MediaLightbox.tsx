import React from 'react'
import { motion } from 'framer-motion'
import { useUIStore } from '../../stores/uiStore'

interface MediaLightboxProps {
  src: string
  isVideo?: boolean
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({ src, isVideo = false }) => {
  const { hideModal } = useUIStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-black/90" onClick={hideModal} />

      <motion.div
        initial={{ scale: 0.98, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative max-w-[90vw] max-h-[90vh]"
      >
        <button
          onClick={hideModal}
          className="absolute top-3 right-3 z-50 text-white/80 bg-black/40 hover:bg-black/60 rounded-full p-2"
          aria-label="Close media"
        >
          ✕
        </button>

        {isVideo ? (
          <video
            src={src}
            controls
            autoPlay
            className="w-full h-full max-h-[90vh] object-contain rounded-lg border border-emerald/20"
          />
        ) : (
          <img
            src={src}
            alt="media"
            className="w-full h-full max-h-[90vh] object-contain rounded-lg border border-emerald/20"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default MediaLightbox
