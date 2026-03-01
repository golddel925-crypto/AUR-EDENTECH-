import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
  }>
  toggleSidebar: () => void
  setTheme: (theme: 'dark' | 'light') => void
  addNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen:
    typeof window !== 'undefined' && window.innerWidth >= 1024 ? true : false,
  theme: 'dark',
  notifications: [],
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
  setTheme: (theme) => set({ theme }),
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
}))
