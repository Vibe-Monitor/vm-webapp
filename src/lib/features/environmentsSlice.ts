import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/services/api/apiFactory'
import { errorHandler } from '@/lib/errorHandler'
import {
  EnvironmentWithRepos,
  AvailableRepository,
  RepositoryBranch,
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
  CreateRepositoryConfigInput,
  UpdateRepositoryConfigInput,
} from '@/types/environment'

interface EnvironmentsState {
  environments: EnvironmentWithRepos[]
  availableRepositories: AvailableRepository[]
  branchesCache: Record<string, RepositoryBranch[]> // keyed by repo full name
  loading: boolean
  error: string | null
  createLoading: boolean
  createError: string | null
  updateLoading: boolean
  updateError: string | null
  deleteLoading: boolean
  deleteError: string | null
  branchesLoading: Record<string, boolean> // keyed by repo full name
}

const initialState: EnvironmentsState = {
  environments: [],
  availableRepositories: [],
  branchesCache: {},
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  branchesLoading: {},
}

export const fetchEnvironments = createAsyncThunk(
  'environments/fetchEnvironments',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.environments.getByWorkspace(workspaceId)
      if (response.status === 200 && response.data) {
        // Handle both direct array and wrapped object responses
        const data = response.data
        if (Array.isArray(data)) {
          return data
        }
        // Check for common wrapper patterns
        if (data && typeof data === 'object') {
          const wrapped = data as Record<string, unknown>
          if (Array.isArray(wrapped.environments)) {
            return wrapped.environments as EnvironmentWithRepos[]
          }
          if (Array.isArray(wrapped.data)) {
            return wrapped.data as EnvironmentWithRepos[]
          }
        }
        return []
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching environments', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch environments'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to load environments. Please try again.',
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading environments. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const createEnvironment = createAsyncThunk(
  'environments/createEnvironment',
  async (
    { workspaceId, data }: { workspaceId: string; data: CreateEnvironmentInput },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.create(workspaceId, data)
      if ((response.status === 200 || response.status === 201) && response.data) {
        return { ...response.data, repository_configs: [] } as EnvironmentWithRepos
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while creating environment', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to create environment'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while creating environment. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateEnvironment = createAsyncThunk(
  'environments/updateEnvironment',
  async (
    { workspaceId, environmentId, data }: { workspaceId: string; environmentId: string; data: UpdateEnvironmentInput },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.update(workspaceId, environmentId, data)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while updating environment', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to update environment'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while updating environment. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteEnvironment = createAsyncThunk(
  'environments/deleteEnvironment',
  async (
    { workspaceId, environmentId }: { workspaceId: string; environmentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.delete(workspaceId, environmentId)
      if (response.status === 200 || response.status === 204) {
        return environmentId
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while deleting environment', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to delete environment'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while deleting environment. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const setDefaultEnvironment = createAsyncThunk(
  'environments/setDefault',
  async (
    { workspaceId, environmentId }: { workspaceId: string; environmentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.setDefault(workspaceId, environmentId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while setting default environment', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to set default environment'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage:
          'Network error while setting default environment. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchAvailableRepositories = createAsyncThunk(
  'environments/fetchAvailableRepositories',
  async (
    { workspaceId, environmentId }: { workspaceId: string; environmentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.getAvailableRepositories(workspaceId, environmentId)
      if (response.status === 200 && response.data) {
        // Handle wrapped response { repositories: [...] }
        const data = response.data
        if (Array.isArray(data)) {
          return data
        }
        if (data && typeof data === 'object') {
          const wrapped = data as Record<string, unknown>
          if (Array.isArray(wrapped.repositories)) {
            return wrapped.repositories as AvailableRepository[]
          }
        }
        return []
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching repositories', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch available repositories'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage:
          'Network error while fetching repositories. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchRepositoryBranches = createAsyncThunk(
  'environments/fetchRepositoryBranches',
  async (
    { workspaceId, repoFullName }: { workspaceId: string; repoFullName: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.getRepositoryBranches(workspaceId, repoFullName)
      if (response.status === 200 && response.data) {
        // Handle wrapped response { branches: [...] }
        const data = response.data
        let branches: RepositoryBranch[] = []
        if (Array.isArray(data)) {
          branches = data
        } else if (data && typeof data === 'object') {
          const wrapped = data as Record<string, unknown>
          if (Array.isArray(wrapped.branches)) {
            branches = wrapped.branches as RepositoryBranch[]
          }
        }
        return { repoFullName, branches }
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching branches', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch branches'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while fetching branches. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const addRepositoryConfig = createAsyncThunk(
  'environments/addRepositoryConfig',
  async (
    { workspaceId, environmentId, data }: { workspaceId: string; environmentId: string; data: CreateRepositoryConfigInput },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.addRepositoryConfig(workspaceId, environmentId, data)
      if ((response.status === 200 || response.status === 201) && response.data) {
        return { environmentId, config: response.data }
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while adding repository', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to add repository'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while adding repository. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateRepositoryConfig = createAsyncThunk(
  'environments/updateRepositoryConfig',
  async (
    {
      workspaceId,
      environmentId,
      repoConfigId,
      data,
    }: { workspaceId: string; environmentId: string; repoConfigId: string; data: UpdateRepositoryConfigInput },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.updateRepositoryConfig(
        workspaceId,
        environmentId,
        repoConfigId,
        data
      )
      if (response.status === 200 && response.data) {
        return { environmentId, config: response.data }
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while updating repository', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to update repository'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while updating repository. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const removeRepositoryConfig = createAsyncThunk(
  'environments/removeRepositoryConfig',
  async (
    { workspaceId, environmentId, repoConfigId }: { workspaceId: string; environmentId: string; repoConfigId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.environments.removeRepositoryConfig(workspaceId, environmentId, repoConfigId)
      if (response.status === 200 || response.status === 204) {
        return { environmentId, repoConfigId }
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while removing repository', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to remove repository'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while removing repository. Please check your connection.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

const environmentsSlice = createSlice({
  name: 'environments',
  initialState,
  reducers: {
    clearEnvironments: (state) => {
      state.environments = []
      state.availableRepositories = []
      state.branchesCache = {}
      state.error = null
      state.loading = false
      state.createError = null
      state.createLoading = false
      state.updateError = null
      state.updateLoading = false
      state.deleteError = null
      state.deleteLoading = false
      state.branchesLoading = {}
    },
    clearCreateError: (state) => {
      state.createError = null
    },
    clearUpdateError: (state) => {
      state.updateError = null
    },
    clearDeleteError: (state) => {
      state.deleteError = null
    },
    updateEnvironmentLocally: (
      state,
      action: PayloadAction<{ environmentId: string; changes: Partial<EnvironmentWithRepos> }>
    ) => {
      const { environmentId, changes } = action.payload
      const index = state.environments.findIndex((env) => env.id === environmentId)
      if (index !== -1) {
        state.environments[index] = { ...state.environments[index], ...changes }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch environments
      .addCase(fetchEnvironments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEnvironments.fulfilled, (state, action) => {
        state.loading = false
        state.environments = action.payload
        state.error = null
      })
      .addCase(fetchEnvironments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create environment
      .addCase(createEnvironment.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(createEnvironment.fulfilled, (state, action) => {
        state.createLoading = false
        state.environments.push(action.payload)
        state.createError = null
      })
      .addCase(createEnvironment.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload as string
      })
      // Update environment
      .addCase(updateEnvironment.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(updateEnvironment.fulfilled, (state, action) => {
        state.updateLoading = false
        const index = state.environments.findIndex((env) => env.id === action.payload.id)
        if (index !== -1) {
          state.environments[index] = {
            ...state.environments[index],
            ...action.payload,
          }
        }
        state.updateError = null
      })
      .addCase(updateEnvironment.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload as string
      })
      // Delete environment
      .addCase(deleteEnvironment.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(deleteEnvironment.fulfilled, (state, action) => {
        state.deleteLoading = false
        state.environments = state.environments.filter((env) => env.id !== action.payload)
        state.deleteError = null
      })
      .addCase(deleteEnvironment.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload as string
      })
      // Set default environment
      .addCase(setDefaultEnvironment.fulfilled, (state, action) => {
        // Update all environments - remove default from others, set on the new one
        state.environments = state.environments.map((env) => ({
          ...env,
          is_default: env.id === action.payload.id,
        }))
      })
      // Fetch available repositories
      .addCase(fetchAvailableRepositories.fulfilled, (state, action) => {
        state.availableRepositories = action.payload
      })
      // Fetch repository branches
      .addCase(fetchRepositoryBranches.pending, (state, action) => {
        state.branchesLoading[action.meta.arg.repoFullName] = true
      })
      .addCase(fetchRepositoryBranches.fulfilled, (state, action) => {
        const { repoFullName, branches } = action.payload
        state.branchesCache[repoFullName] = branches
        state.branchesLoading[repoFullName] = false
      })
      .addCase(fetchRepositoryBranches.rejected, (state, action) => {
        state.branchesLoading[action.meta.arg.repoFullName] = false
      })
      // Add repository config
      .addCase(addRepositoryConfig.fulfilled, (state, action) => {
        const { environmentId, config } = action.payload
        const env = state.environments.find((e) => e.id === environmentId)
        if (env) {
          env.repository_configs.push(config)
        }
      })
      // Update repository config
      .addCase(updateRepositoryConfig.fulfilled, (state, action) => {
        const { environmentId, config } = action.payload
        const env = state.environments.find((e) => e.id === environmentId)
        if (env) {
          const configIndex = env.repository_configs.findIndex((c) => c.id === config.id)
          if (configIndex !== -1) {
            env.repository_configs[configIndex] = config
          }
        }
      })
      // Remove repository config
      .addCase(removeRepositoryConfig.fulfilled, (state, action) => {
        const { environmentId, repoConfigId } = action.payload
        const env = state.environments.find((e) => e.id === environmentId)
        if (env) {
          env.repository_configs = env.repository_configs.filter((c) => c.id !== repoConfigId)
        }
      })
  },
})

export const {
  clearEnvironments,
  clearCreateError,
  clearUpdateError,
  clearDeleteError,
  updateEnvironmentLocally,
} = environmentsSlice.actions

export default environmentsSlice.reducer
