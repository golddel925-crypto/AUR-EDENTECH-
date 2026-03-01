import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { BackgroundFX } from './BackgroundFX'
import { Modal } from '../ui/Modal'
import { Notifications } from '../ui/Notifications'
import { useSessionStore } from '../../stores/sessionStore'

export const PlatformLayout: React.FC = () => {
  // hydrate session store from sessionStorage if available; AuthGate will
  // normally handle this, but keeping redundancy prevents glitches if someone
  // landed directly inside the platform layout without going through the
  // gate (e.g. during development).
  useEffect(() => {
    const seq = sessionStorage.getItem('sequence_id')
    if (seq) {
      useSessionStore.getState().setSession(seq, seq)
    }
  }, [])

  return (
    <>
      <BackgroundFX />
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-1 pt-20 px-6">
          <Outlet />
        </main>
      </div>
      {/* global modal layer */}
      <Modal />
      {/* notifications */}
      <Notifications />
    </>
  )
}

export default PlatformLayout
