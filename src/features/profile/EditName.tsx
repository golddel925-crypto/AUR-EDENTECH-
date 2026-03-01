import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useProfileStore } from '../../stores/profileStore'
import { useUIStore } from '../../stores/uiStore'
import * as rpcFunctions from '../../core/rpc'

interface EditNameProps {
  currentName: string
}

export const EditName: React.FC<EditNameProps> = ({ currentName }) => {
  const [newName, setNewName] = useState(currentName)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { updatePublicName } = useProfileStore()
  const { addNotification } = useUIStore()

  const validateName = (name: string) => {
    if (name.length < 3) return 'Minimo 3 caratteri'
    if (name.length > 24) return 'Massimo 24 caratteri'
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return 'Solo lettere, numeri e underscore'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateName(newName)
    if (validationError) {
      setError(validationError)
      return
    }

    if (newName === currentName) {
      addNotification('Nessun cambiamento', 'info')
      return
    }

    setLoading(true)
    try {
      await rpcFunctions.updatePublicName(newName)
      updatePublicName(newName)
      addNotification('Nome aggiornato con successo', 'success')
    } catch (err) {
      console.error('Failed to update name:', err)
      const errorMsg = err instanceof Error ? err.message : 'Errore nell\'aggiornamento'
      addNotification(errorMsg, 'error')
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Nome Pubblico</h3>

        <Input
          label="Nome"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value)
            setError('')
          }}
          maxLength={24}
          error={error}
          placeholder="Nome pubblico"
        />

        <p className="text-white/50 text-sm">
          {newName.length}/24 caratteri
        </p>

        <p className="text-emerald text-xs bg-emerald/10 p-3 rounded">
          Lettere, numeri e underscore. Deve essere unico.
        </p>

        <motion.div
          className="flex gap-3"
          whileHover={{ scale: 1.01 }}
        >
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => {
              setNewName(currentName)
              setError('')
            }}
          >
            Annulla
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            fullWidth
          >
            Salva
          </Button>
        </motion.div>
      </form>
    </Card>
  )
}
