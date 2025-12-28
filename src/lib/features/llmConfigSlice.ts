import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api/apiFactory'
import { errorHandler } from '@/lib/errorHandler'
import type { LLMConfig, LLMConfigUpdateRequest, LLMConfigVerifyRequest } from '@/services/api/clients/LLMConfigClient'

interface LLMConfigState {
  config: LLMConfig | null
  loading: boolean
  error: string | null
  verifying: boolean
  verifyError: string | null
  verifySuccess: boolean
  saving: boolean
  saveError: string | null
}

const initialState: LLMConfigState = {
  config: null,
  loading: false,
  error: null,
  verifying: false,
  verifyError: null,
  verifySuccess: false,
  saving: false,
  saveError: null,
}

export const fetchLLMConfig = createAsyncThunk(
  'llmConfig/fetchConfig',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.llm.getConfig(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching LLM config', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else if (response.status === 404) {
        // No config exists yet, return default vibemonitor config
        return null
      } else {
        const errorMessage = response.error || 'Failed to fetch LLM configuration'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to load LLM configuration. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading LLM configuration. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const verifyLLMCredentials = createAsyncThunk(
  'llmConfig/verifyCredentials',
  async (
    { workspaceId, data }: { workspaceId: string; data: LLMConfigVerifyRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.llm.verifyCredentials(workspaceId, data)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while verifying credentials', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to verify credentials'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateLLMConfig = createAsyncThunk(
  'llmConfig/updateConfig',
  async (
    { workspaceId, data }: { workspaceId: string; data: LLMConfigUpdateRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.llm.updateConfig(workspaceId, data)
      if ((response.status === 200 || response.status === 201) && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while updating LLM config', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to update LLM configuration'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to save LLM configuration. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while saving LLM configuration. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const resetLLMConfig = createAsyncThunk(
  'llmConfig/resetConfig',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.llm.resetConfig(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 204) {
        // Successfully deleted, return null to indicate default config
        return null
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while resetting LLM config', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to reset LLM configuration'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to reset LLM configuration. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while resetting LLM configuration. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

const llmConfigSlice = createSlice({
  name: 'llmConfig',
  initialState,
  reducers: {
    clearLLMConfig: (state) => {
      state.config = null
      state.error = null
      state.loading = false
      state.verifying = false
      state.verifyError = null
      state.verifySuccess = false
      state.saving = false
      state.saveError = null
    },
    clearVerifyState: (state) => {
      state.verifying = false
      state.verifyError = null
      state.verifySuccess = false
    },
    clearSaveState: (state) => {
      state.saving = false
      state.saveError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch config
      .addCase(fetchLLMConfig.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLLMConfig.fulfilled, (state, action) => {
        state.loading = false
        state.config = action.payload
        state.error = null
      })
      .addCase(fetchLLMConfig.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Verify credentials
      .addCase(verifyLLMCredentials.pending, (state) => {
        state.verifying = true
        state.verifyError = null
        state.verifySuccess = false
      })
      .addCase(verifyLLMCredentials.fulfilled, (state, action) => {
        state.verifying = false
        state.verifySuccess = action.payload.success
        state.verifyError = action.payload.success ? null : action.payload.message
      })
      .addCase(verifyLLMCredentials.rejected, (state, action) => {
        state.verifying = false
        state.verifyError = action.payload as string
        state.verifySuccess = false
      })
      // Update config
      .addCase(updateLLMConfig.pending, (state) => {
        state.saving = true
        state.saveError = null
      })
      .addCase(updateLLMConfig.fulfilled, (state, action) => {
        state.saving = false
        state.config = action.payload
        state.saveError = null
      })
      .addCase(updateLLMConfig.rejected, (state, action) => {
        state.saving = false
        state.saveError = action.payload as string
      })
      // Reset config
      .addCase(resetLLMConfig.pending, (state) => {
        state.saving = true
        state.saveError = null
      })
      .addCase(resetLLMConfig.fulfilled, (state, action) => {
        state.saving = false
        state.config = action.payload
        state.saveError = null
        state.verifySuccess = false
        state.verifyError = null
      })
      .addCase(resetLLMConfig.rejected, (state, action) => {
        state.saving = false
        state.saveError = action.payload as string
      })
  },
})

export const { clearLLMConfig, clearVerifyState, clearSaveState } = llmConfigSlice.actions
export default llmConfigSlice.reducer
