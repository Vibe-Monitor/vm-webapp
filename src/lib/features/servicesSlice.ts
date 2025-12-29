import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api/apiFactory'
import { errorHandler } from '@/lib/errorHandler'
import type {
  Service,
  ServiceCount,
  CreateServiceRequest,
  UpdateServiceRequest,
} from '@/services/api/clients/ServicesClient'

interface ServicesState {
  services: Service[]
  serviceCount: ServiceCount | null
  loading: boolean
  error: string | null
  createLoading: boolean
  createError: string | null
  updateLoading: boolean
  updateError: string | null
  deleteLoading: boolean
  deleteError: string | null
}

const initialState: ServicesState = {
  services: [],
  serviceCount: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
}

export const fetchServices = createAsyncThunk(
  'services/fetchAll',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.services.getAll(workspaceId)
      if (response.status === 200 && response.data) {
        // Handle both direct array and wrapped object responses
        const data = response.data
        if (Array.isArray(data)) {
          return { services: data, serviceCount: null }
        }
        if (data && typeof data === 'object') {
          const wrapped = data as Record<string, unknown>
          let services: Service[] = []
          let serviceCount: ServiceCount | null = null

          if (Array.isArray(wrapped.services)) {
            services = wrapped.services as Service[]
          } else if (Array.isArray(wrapped.data)) {
            services = wrapped.data as Service[]
          }

          // Extract count info from wrapped response
          if (typeof wrapped.total_count === 'number' && typeof wrapped.limit === 'number') {
            serviceCount = {
              count: wrapped.total_count,
              limit: wrapped.limit,
              is_paid: wrapped.limit_reached === false && wrapped.limit > 5, // Infer from limit
            }
          }

          return { services, serviceCount }
        }
        return { services: [], serviceCount: null }
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching services', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch services'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to load services. Please try again.',
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading services.',
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchServiceCount = createAsyncThunk(
  'services/fetchCount',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.services.getCount(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else {
        const errorMessage = response.error || 'Failed to fetch service count'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createService = createAsyncThunk(
  'services/create',
  async ({ workspaceId, data }: { workspaceId: string; data: CreateServiceRequest }, { rejectWithValue }) => {
    try {
      const response = await api.services.create(workspaceId, data)
      if ((response.status === 200 || response.status === 201) && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          redirectToAuth: true,
        })
        return rejectWithValue('Authentication failed')
      } else if (response.status === 403) {
        return rejectWithValue('Service limit reached. Please upgrade your plan.')
      } else if (response.status === 409) {
        return rejectWithValue('A service with this name already exists')
      } else {
        // Extract error message from response - FastAPI returns { detail: "message" }
        const data = response.data as { detail?: string } | undefined
        const errorMessage = data?.detail || response.error || 'Failed to create service'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateService = createAsyncThunk(
  'services/update',
  async (
    { workspaceId, serviceId, data }: { workspaceId: string; serviceId: string; data: UpdateServiceRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.services.update(workspaceId, serviceId, data)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 409) {
        return rejectWithValue('A service with this name already exists')
      } else {
        // Extract error message from response - FastAPI returns { detail: "message" }
        const data = response.data as { detail?: string } | undefined
        const errorMessage = data?.detail || response.error || 'Failed to update service'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const deleteService = createAsyncThunk(
  'services/delete',
  async ({ workspaceId, serviceId }: { workspaceId: string; serviceId: string }, { rejectWithValue }) => {
    try {
      const response = await api.services.delete(workspaceId, serviceId)
      if (response.status === 200 || response.status === 204) {
        return serviceId
      } else {
        const errorMessage = response.error || 'Failed to delete service'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServices: (state) => {
      state.services = []
      state.serviceCount = null
      state.error = null
      state.loading = false
    },
    clearErrors: (state) => {
      state.error = null
      state.createError = null
      state.updateError = null
      state.deleteError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false
        state.services = action.payload.services
        if (action.payload.serviceCount) {
          state.serviceCount = action.payload.serviceCount
        }
        state.error = null
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch service count
      .addCase(fetchServiceCount.fulfilled, (state, action) => {
        state.serviceCount = action.payload
      })
      // Create service
      .addCase(createService.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.createLoading = false
        state.services.push(action.payload)
        if (state.serviceCount) {
          state.serviceCount.count += 1
        }
        state.createError = null
      })
      .addCase(createService.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload as string
      })
      // Update service
      .addCase(updateService.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.updateLoading = false
        const index = state.services.findIndex((s) => s.id === action.payload.id)
        if (index !== -1) {
          state.services[index] = action.payload
        }
        state.updateError = null
      })
      .addCase(updateService.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload as string
      })
      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.deleteLoading = false
        state.services = state.services.filter((s) => s.id !== action.payload)
        if (state.serviceCount) {
          state.serviceCount.count -= 1
        }
        state.deleteError = null
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload as string
      })
  },
})

export const { clearServices, clearErrors } = servicesSlice.actions
export default servicesSlice.reducer
