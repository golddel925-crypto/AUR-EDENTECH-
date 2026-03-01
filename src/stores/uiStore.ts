import React from 'react'
import { create } from 'zustand'

interface UIState {
  theme: 'dark' | 'light'
  sidebarOpen: boolean
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }>
  setTheme: (theme: 'dark' | 'light') => void
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
  addNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
  // modal helpers
  modalContent: React.ReactNode | null
  showModal: (content: React.ReactNode) => void
  hideModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  sidebarOpen: true,
  notifications: [],
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openSidebar: () => set({ sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          message,
          type,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
  // modal state
  modalContent: null,
  showModal: (content) => set({ modalContent: content }),
  hideModal: () => set({ modalContent: null }),
}))
