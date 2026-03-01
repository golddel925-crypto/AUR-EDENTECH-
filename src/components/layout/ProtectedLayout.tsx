import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { BackgroundFX } from './BackgroundFX'
import { Modal } from '../ui/Modal'
import { Notifications } from '../ui/Notifications'
import { useSessionStore } from '../../stores/sessionStore'
import { TopNav } from './TopNav'
import { AuthGate } from './AuthGate'

// AuthGuard is a noop wrapper used by the layout specification. It does not
// contain any logic but having it here keeps the structure aligned with the
// requested markup. It may be extended later if needed.
const AuthGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <>{children}</>;

export const ProtectedLayout: React.FC = () => {
  // hydrate session store from sessionStorage if available (legacy layout)
  useEffect(() => {
    const seq = sessionStorage.getItem('sequence_id')
    if (seq) {
      // use sequence as userId for now
      useSessionStore.getState().setSession(seq, seq)
    }
  }, [])

  return (
    <AuthGuard>
      <AuthGate>
        <BackgroundFX />
        <div className="min-h-screen flex flex-col">
          <TopNav />
          <main className="flex-1 flex justify-center pt-24 px-6 pb-16">
            <div className="w-full max-w-[1400px]">
              <Outlet />
            </div>
          </main>
        </div>
        <Modal />
        <Notifications />
      </AuthGate>
    </AuthGuard>
  )
}
