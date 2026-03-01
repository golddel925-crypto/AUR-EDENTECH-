import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { rpcFunctions } from '../../core/rpc'
import { useUIStore } from '../../stores/uiStore'

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
  })
  const { addNotification } = useUIStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

          {/* Note about media */}
          <p className="text-white/50 text-sm">
            Supporto media (immagini e video) disponibile dopo la creazione
          </p>

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
