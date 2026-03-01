import React from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card>
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-emerald mb-2">Accedi</h1>
          <p className="text-white/60 mb-4">Per favore effettua il login o usa i parametri `user_id` e `sequence_id` nell'URL.</p>
          <div className="flex gap-3">
            <Button onClick={() => { window.location.href = '/' }} variant="primary">Torna</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
