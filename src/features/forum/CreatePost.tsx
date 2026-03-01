import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { rpcFunctions } from '../../core/rpc'
import { useUIStore } from '../../stores/uiStore'
import { supabase } from '../../lib/supabase'

interface CreatePostProps {
  onPostCreated: () => void
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    problem_reflection: '',
    solution_intention: '',
    context_description: '',
    media_urls: [] as string[],
  })
  const { addNotification } = useUIStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const maxImages = 5
    const maxVideos = 2
    let imageCount = formData.media_urls.filter((u) => u.match(/\.(jpg|png|webp)$/i)).length
    let videoCount = formData.media_urls.filter((u) => u.match(/\.(mp4|mov)$/i)).length

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const isVideo = file.type.startsWith('video/')
      if (isVideo && videoCount >= maxVideos) continue
      if (!isVideo && imageCount >= maxImages) continue

      const prefix = isVideo ? 'videos' : 'images'
      const fileName = `${Date.now()}_${file.name}`
      try {
        const { data, error } = await supabase.storage
          .from('post-media')
          .upload(`${prefix}/${fileName}`, file, { cacheControl: '3600', upsert: false })
        if (error) throw error
        const { data: urlData } = supabase.storage
          .from('post-media')
          .getPublicUrl(`${prefix}/${fileName}`)
        if (urlData?.publicUrl) {
          setFormData((prev) => ({
            ...prev,
            media_urls: [...prev.media_urls, urlData.publicUrl],
          }))
          if (isVideo) videoCount++
          else imageCount++
        }
      } catch (err) {
        console.error('Failed to upload media:', err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.problem_reflection.trim() ||
      !formData.solution_intention.trim() ||
      !formData.context_description.trim()
    ) {
      addNotification('Completa tutti i campi', 'error')
      return
    }

    setLoading(true)
    try {
      await rpcFunctions.createPost(formData)
      addNotification('Post creato con successo', 'success')
      setFormData({
        title: '',
        problem_reflection: '',
        solution_intention: '',
        context_description: '',
        media_urls: [],
      })
      setIsExpanded(false)
      onPostCreated()
    } catch (err) {
      console.error('Failed to create post:', err)
      addNotification(
        err instanceof Error ? err.message : 'Errore nella creazione',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isExpanded) {
    return (
      <motion.button
        onClick={() => setIsExpanded(true)}
        className="w-full py-4 border border-emerald/30 rounded-lg hover:border-emerald/60 transition-all text-left pl-6 text-white/70"
        whileHover={{ scale: 1.01 }}
      >
        Condividi una riflessione...
      </motion.button>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card>
        <div className="space-y-4">
          <Input
            label="Titolo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titolo del post"
            maxLength={100}
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Riflessione (Problema)
            </label>
            <textarea
              name="problem_reflection"
              value={formData.problem_reflection}
              onChange={handleChange}
              placeholder="Descrivi la situazione problematica..."
              maxLength={500}
              className="w-full h-20 bg-black/50 border border-emerald/30 text-white placeholder-white/50 px-4 py-3 rounded-lg focus:border-emerald focus:shadow-lg focus:shadow-emerald/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Intenzione (Soluzione)
            </label>
            <textarea
              name="solution_intention"
              value={formData.solution_intention}
              onChange={handleChange}
              placeholder="Qual è la tua intenzione per risolvere?"
              maxLength={500}
              className="w-full h-20 bg-black/50 border border-emerald/30 text-white placeholder-white/50 px-4 py-3 rounded-lg focus:border-emerald focus:shadow-lg focus:shadow-emerald/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contesto</label>
            <textarea
              name="context_description"
              value={formData.context_description}
              onChange={handleChange}
              placeholder="Descrivi il contesto più ampio..."
              maxLength={500}
              className="w-full h-20 bg-black/50 border border-emerald/30 text-white placeholder-white/50 px-4 py-3 rounded-lg focus:border-emerald focus:shadow-lg focus:shadow-emerald/20 transition-all"
            />
          </div>

          {/* Media upload section */}
          <div>
            <label className="block text-sm font-medium mb-2">Aggiungi media</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFiles}
              className="w-full text-sm text-white bg-black/20 rounded-md file:bg-emerald/20 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-semibold file:text-emerald-300 hover:file:bg-emerald/30"
            />
            {formData.media_urls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {formData.media_urls.map((url, idx) => {
                  const isVideo = url.match(/\.(mp4|mov)$/i)
                  return isVideo ? (
                    <video
                      key={idx}
                      src={url}
                      controls
                      className="rounded-lg w-full h-24 object-cover bg-black"
                    />
                  ) : (
                    <img
                      key={idx}
                      src={url}
                      className="rounded-lg w-full h-24 object-cover"
                    />
                  )
                })}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsExpanded(false)}
            >
              Cancella
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              fullWidth
            >
              Pubblica
            </Button>
          </div>
        </div>
      </Card>
    </motion.form>
  )
}
