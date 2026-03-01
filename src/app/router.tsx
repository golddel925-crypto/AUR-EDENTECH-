import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { TotalitaPage } from '../features/dashboard/TotalitaPage'
import { ForumPage } from '../features/forum/ForumPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { JourneyPage } from '../features/viaggio/JourneyPage'
import { BadgesPage } from '../features/badges/BadgesPage'
import { WalletPage } from '../features/wallet/WalletPage'
import { ActiveUsersPage } from '../features/users/ActiveUsersPage'
import { LoginPage } from '../features/auth/LoginPage'
import { AuthGuard } from '../components/AuthGuard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/totalita" replace />,
  },
  {
    path: '/totalita',
    element: (
      <AuthGuard>
        <AppLayout>
          <TotalitaPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/forum',
    element: (
      <AuthGuard>
        <AppLayout>
          <ForumPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthGuard>
        <AppLayout>
          <ProfilePage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/viaggio',
    element: (
      <AuthGuard>
        <AppLayout>
          <JourneyPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/badges',
    element: (
      <AuthGuard>
        <AppLayout>
          <BadgesPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/wallet',
    element: (
      <AuthGuard>
        <AppLayout>
          <WalletPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/users',
    element: (
      <AuthGuard>
        <AppLayout>
          <ActiveUsersPage />
        </AppLayout>
      </AuthGuard>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/totalita" replace />,
  },
])
