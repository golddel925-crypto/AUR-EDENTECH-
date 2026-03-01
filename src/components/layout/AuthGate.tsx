import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../stores/sessionStore'

/**
 * AuthGate ensures the authenticated portion of the app is only rendered
 * after the session state has been checked. It reads from sessionStorage and
 * updates the session store accordingly. Until the check completes the
 * component returns `null` to avoid flashes of protected content.
 */
export const AuthGate: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate()
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated)
  const [authChecked, setAuthChecked] = React.useState(false)

  // perform sessionStorage lookup once on mount
  React.useEffect(() => {
    const seq = sessionStorage.getItem('sequence_id')
    if (seq) {
      // treat the sequence as both userId & sequenceId for now
      useSessionStore.getState().setSession(seq, seq)
    } else {
      useSessionStore.getState().clearSession()
    }
    setAuthChecked(true)
  }, [])

  // redirect to login if we've finished checking and user is not auth'd
  React.useEffect(() => {
    if (!authChecked) return
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [authChecked, isAuthenticated, navigate])

  if (!authChecked) {
    // still determining session state
    return null
  }

  if (!isAuthenticated) {
    // redirect effect will handle navigation; don't render children
    return null
  }

  return <>{children}</>
}

export default AuthGate
