import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import workspaceReducer from './features/workspaceSlice'
import uiReducer from './features/uiSlice'
import environmentsReducer from './features/environmentsSlice'
import servicesReducer from './features/servicesSlice'
import llmConfigReducer from './features/llmConfigSlice'
import membersReducer from './features/membersSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      workspace: workspaceReducer,
      ui: uiReducer,
      environments: environmentsReducer,
      services: servicesReducer,
      llmConfig: llmConfigReducer,
      members: membersReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']