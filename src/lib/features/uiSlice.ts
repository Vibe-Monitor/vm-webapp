import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SIDEBAR_STORAGE_KEY = 'vibemonitor_sidebar_collapsed'

interface UIState {
  sidebarCollapsed: boolean
}

// Helper to get initial state from localStorage (only on client)
const getInitialSidebarState = (): boolean => {
  if (typeof window === 'undefined') {
    return false // Default to expanded on server
  }

  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    if (stored !== null) {
      return stored === 'true'
    }

    // Default: collapsed on tablet (< 1024px), expanded on desktop
    return window.innerWidth < 1024
  } catch {
    return false
  }
}

const initialState: UIState = {
  sidebarCollapsed: false, // Will be hydrated on client
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SIDEBAR_STORAGE_KEY, String(state.sidebarCollapsed))
        } catch {
          // Ignore localStorage errors
        }
      }
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SIDEBAR_STORAGE_KEY, String(action.payload))
        } catch {
          // Ignore localStorage errors
        }
      }
    },
    hydrateSidebarState: (state) => {
      // Called on client-side to hydrate from localStorage
      state.sidebarCollapsed = getInitialSidebarState()
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed, hydrateSidebarState } = uiSlice.actions
export default uiSlice.reducer
