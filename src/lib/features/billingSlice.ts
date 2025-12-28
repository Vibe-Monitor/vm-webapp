import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api/apiFactory'
import { errorHandler } from '@/lib/errorHandler'
import type { Plan, Subscription, Usage } from '@/services/api/clients/BillingClient'

interface BillingState {
  plans: Plan[]
  subscription: Subscription | null
  usage: Usage | null
  loading: boolean
  error: string | null
  checkoutLoading: boolean
  portalLoading: boolean
  cancelLoading: boolean
}

const initialState: BillingState = {
  plans: [],
  subscription: null,
  usage: null,
  loading: false,
  error: null,
  checkoutLoading: false,
  portalLoading: false,
  cancelLoading: false,
}

export const fetchPlans = createAsyncThunk(
  'billing/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.billing.getPlans()
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching plans', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch plans'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading plans. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchSubscription = createAsyncThunk(
  'billing/fetchSubscription',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.billing.getSubscription(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching subscription', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else if (response.status === 404) {
        // No subscription found, return null (free plan)
        return null
      } else {
        const errorMessage = response.error || 'Failed to fetch subscription'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading subscription. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchUsage = createAsyncThunk(
  'billing/fetchUsage',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.billing.getUsage(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching usage', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch usage'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading usage. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const subscribeToPro = createAsyncThunk(
  'billing/subscribeToPro',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.billing.subscribeToPro(workspaceId)
      if ((response.status === 200 || response.status === 201) && response.data) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.checkout_url
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to create checkout session'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to start checkout. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const openBillingPortal = createAsyncThunk(
  'billing/openBillingPortal',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.billing.getBillingPortal(workspaceId)
      if ((response.status === 200 || response.status === 201) && response.data) {
        // Redirect to Stripe Portal
        window.location.href = response.data.portal_url
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to open billing portal'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to open billing portal. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const cancelSubscription = createAsyncThunk(
  'billing/cancelSubscription',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.billing.cancelSubscription(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to cancel subscription'
        errorHandler.handleGenericError(errorMessage, {
          customMessage: 'Unable to cancel subscription. Please try again.'
        })
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error. Please check your connection.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    clearBilling: (state) => {
      state.plans = []
      state.subscription = null
      state.usage = null
      state.error = null
      state.loading = false
      state.checkoutLoading = false
      state.portalLoading = false
      state.cancelLoading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch plans
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false
        state.plans = action.payload
        state.error = null
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch subscription
      .addCase(fetchSubscription.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSubscription.fulfilled, (state, action) => {
        state.loading = false
        state.subscription = action.payload
        state.error = null
      })
      .addCase(fetchSubscription.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch usage
      .addCase(fetchUsage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsage.fulfilled, (state, action) => {
        state.loading = false
        state.usage = action.payload
        state.error = null
      })
      .addCase(fetchUsage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Subscribe to Pro
      .addCase(subscribeToPro.pending, (state) => {
        state.checkoutLoading = true
        state.error = null
      })
      .addCase(subscribeToPro.fulfilled, (state) => {
        state.checkoutLoading = false
        state.error = null
      })
      .addCase(subscribeToPro.rejected, (state, action) => {
        state.checkoutLoading = false
        state.error = action.payload as string
      })
      // Open billing portal
      .addCase(openBillingPortal.pending, (state) => {
        state.portalLoading = true
        state.error = null
      })
      .addCase(openBillingPortal.fulfilled, (state) => {
        state.portalLoading = false
        state.error = null
      })
      .addCase(openBillingPortal.rejected, (state, action) => {
        state.portalLoading = false
        state.error = action.payload as string
      })
      // Cancel subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true
        state.error = null
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.cancelLoading = false
        state.subscription = action.payload
        state.error = null
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearBilling, clearError } = billingSlice.actions
export default billingSlice.reducer
