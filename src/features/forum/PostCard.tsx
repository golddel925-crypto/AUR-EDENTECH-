import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import * as rpcFunctions from '../../core/rpc'
import { useUIStore } from '../../stores/uiStore'
import MediaLightbox from '../../components/ui/MediaLightbox'

interface PostCardProps {
  post: {
    id: string
    title: string
    problem_reflection: string
    solution_intention: string
    context_description: string
    media_urls?: string[]
    created_at?: string
    user_name?: string
    presente_count?: number
    risuona_count?: number
  }
  minimal?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({ post, minimal = false }) => {
  const [presenteCount, setPresenteCount] = useState(post.presente_count || 0)
  const [risuonaCount, setRisuonaCount] = useState(post.risuona_count || 0)
  const [loading, setLoading] = useState<'presente' | 'risuona' | null>(null)

  const handlePresente = async () => {
    setLoading('presente')
    try {
      await rpcFunctions.interactPost(post.id, 'presente')
      setPresenteCount((prev) => prev + 1)
    } catch (err) {
      console.error('Failed to interact:', err)
    } finally {
      setLoading(null)
    }
  }

  const handleRisuona = async () => {
    setLoading('risuona')
    try {
      await rpcFunctions.interactPost(post.id, 'risuona')
      setRisuonaCount((prev) => prev + 1)
    } catch (err) {
      console.error('Failed to interact:', err)
    } finally {
      setLoading(null)
    }
  }

  const { showModal } = useUIStore()

  const openMedia = (url: string) => {
    const isVideo = !!url.match(/\.(mp4|mov)$/i)
    showModal(<MediaLightbox src={url} isVideo={isVideo} />)
  }

  if (minimal) {
    return (
      <Card hoverable className="p-4">
        <h4 className="font-semibold text-sm mb-1 truncate">{post.title}</h4>
        <p className="text-xs text-white/50 truncate">{post.problem_reflection}</p>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-gold/40">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{post.title}</h3>
            <p className="text-emerald text-sm">
              {post.user_name || 'Anonimo'} •
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString('it-IT')
                : 'Recente'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6 border-t border-emerald/30 pt-4">
          <div>
            <h4 className="text-sm font-semibold text-emerald mb-2">Riflessione</h4>
            <p className="text-white/70">{post.problem_reflection}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-emerald mb-2">Intenzione</h4>
            <p className="text-white/70">{post.solution_intention}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-emerald mb-2">Contesto</h4>
            <p className="text-white/70">{post.context_description}</p>
          </div>
        </div>

        {/* Media (images/videos) */}
          {post.media_urls && post.media_urls.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              {post.media_urls.slice(0, 5).map((url, idx) => {
                const isVideo = url.match(/\.(mp4|mov)$/i)
                return isVideo ? (
                  <motion.div
                    key={idx}
                    className="rounded-lg w-full h-36 bg-black border border-emerald/20 overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => openMedia(url)}
                  >
                    <video src={url} className="w-full h-full object-cover" />
                  </motion.div>
                ) : (
                  <motion.img
                    key={idx}
                    src={url}
                    alt={`Media ${idx + 1}`}
                    className="rounded-lg w-full h-36 object-cover border border-emerald/20 cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    onClick={() => openMedia(url)}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Interactions */}
        <div className="flex gap-4 pt-4 border-t border-emerald/10">
          <motion.button
            onClick={handlePresente}
            disabled={loading === 'risuona'}
            className="flex-1 py-2 px-4 border border-emerald/30 text-emerald hover:border-emerald transition-all rounded-lg disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{
              scale: 0.96,
              boxShadow: '0 0 8px rgba(80,200,120,0.9)',
            }}
          >
            {loading === 'presente' ? '⟳' : '✓'} Presente ({presenteCount})
          </motion.button>

          <motion.button
            onClick={handleRisuona}
            disabled={loading === 'presente'}
            className="flex-1 py-2 px-4 border border-gold/30 text-gold hover:border-gold transition-all rounded-lg disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{
              scale: 0.96,
              boxShadow: '0 0 8px rgba(255,215,0,0.9)',
            }}
          >
            {loading === 'risuona' ? '⟳' : '◊'} Risuona ({risuonaCount})
          </motion.button>
        </div>
      </Card>
    </motion.div>
  )
}
