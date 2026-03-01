import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useProfileStore } from '../../stores/profileStore'
import { useUIStore } from '../../stores/uiStore'

export const AvatarUpload: React.FC = () => {
  const { profile, updateAvatar } = useProfileStore()
  const { addNotification } = useUIStore()
  const [loading, setLoading] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addNotification('File troppo grande (max 5MB)', 'error')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      addNotification('Solo immagini sono supportate', 'error')
      return
    }

    setLoading(true)
    try {
      // Create a local preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        updateAvatar(dataUrl)
        addNotification('Avatar aggiornato', 'success')
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error('Avatar upload error:', err)
      addNotification('Errore durante l\'upload', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-6">Avatar</h3>

        {/* Avatar Display */}
        <motion.div
          className="mx-auto w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-emerald to-gold flex items-center justify-center text-6xl font-bold cursor-pointer hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
        >
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            profile?.publicName?.[0]?.toUpperCase() || 'A'
          )}
        </motion.div>

        {/* Upload Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
          disabled={loading}
        />
        <Button
          variant="primary"
          size="md"
          loading={loading}
          onClick={handleClick}
        >
          Carica Avatar
        </Button>

        <p className="text-white/50 text-sm mt-4">
          JPG, PNG. Max 5MB.
        </p>
      </div>
    </Card>
  )
}
