import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/services/api/apiFactory'
import { errorHandler } from '@/lib/errorHandler'
import type { Member, Invitation, InviteMemberRequest, UpdateMemberRoleRequest } from '@/services/api/clients/MembersClient'

interface MembersState {
  members: Member[]
  invitations: Invitation[]
  loading: boolean
  error: string | null
  inviteLoading: boolean
  inviteError: string | null
  roleUpdateLoading: string | null // userId being updated
  removeMemberLoading: string | null // userId being removed
  revokeInvitationLoading: string | null // invitationId being revoked
}

const initialState: MembersState = {
  members: [],
  invitations: [],
  loading: false,
  error: null,
  inviteLoading: false,
  inviteError: null,
  roleUpdateLoading: null,
  removeMemberLoading: null,
  revokeInvitationLoading: null,
}

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.members.getMembers(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching members', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch members'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading members.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchInvitations = createAsyncThunk(
  'members/fetchInvitations',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      const response = await api.members.getInvitations(workspaceId)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed while fetching invitations', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to fetch invitations'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while loading invitations.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const inviteMember = createAsyncThunk(
  'members/inviteMember',
  async ({ workspaceId, data }: { workspaceId: string; data: InviteMemberRequest }, { rejectWithValue }) => {
    try {
      const response = await api.members.createInvitation(workspaceId, data)
      if ((response.status === 200 || response.status === 201) && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else if (response.status === 409) {
        return rejectWithValue('This user has already been invited or is already a member')
      } else {
        const errorMessage = response.error || 'Failed to send invitation'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while sending invitation.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateMemberRole = createAsyncThunk(
  'members/updateMemberRole',
  async (
    { workspaceId, userId, data }: { workspaceId: string; userId: string; data: UpdateMemberRoleRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.members.updateMemberRole(workspaceId, userId, data)
      if (response.status === 200 && response.data) {
        return response.data
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else if (response.status === 400) {
        return rejectWithValue('Cannot demote the last owner')
      } else {
        const errorMessage = response.error || 'Failed to update role'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while updating role.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const removeMember = createAsyncThunk(
  'members/removeMember',
  async ({ workspaceId, userId }: { workspaceId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await api.members.removeMember(workspaceId, userId)
      if (response.status === 200 || response.status === 204) {
        return userId
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to remove member'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while removing member.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

export const revokeInvitation = createAsyncThunk(
  'members/revokeInvitation',
  async ({ workspaceId, invitationId }: { workspaceId: string; invitationId: string }, { rejectWithValue }) => {
    try {
      const response = await api.members.revokeInvitation(workspaceId, invitationId)
      if (response.status === 200 || response.status === 204) {
        return invitationId
      } else if (response.status === 401) {
        errorHandler.handleAuthError('Authentication failed', {
          customMessage: 'Please log in again to continue.',
          redirectToAuth: true
        })
        return rejectWithValue('Authentication failed')
      } else {
        const errorMessage = response.error || 'Failed to revoke invitation'
        return rejectWithValue(errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Network error while revoking invitation.'
      })
      return rejectWithValue(errorMessage)
    }
  }
)

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    clearMembers: (state) => {
      state.members = []
      state.invitations = []
      state.error = null
      state.loading = false
      state.inviteError = null
      state.inviteLoading = false
    },
    clearInviteError: (state) => {
      state.inviteError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch members
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false
        state.members = action.payload
        state.error = null
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch invitations
      .addCase(fetchInvitations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInvitations.fulfilled, (state, action) => {
        state.loading = false
        state.invitations = action.payload
        state.error = null
      })
      .addCase(fetchInvitations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Invite member
      .addCase(inviteMember.pending, (state) => {
        state.inviteLoading = true
        state.inviteError = null
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        state.inviteLoading = false
        state.invitations.push(action.payload)
        state.inviteError = null
      })
      .addCase(inviteMember.rejected, (state, action) => {
        state.inviteLoading = false
        state.inviteError = action.payload as string
      })
      // Update member role
      .addCase(updateMemberRole.pending, (state, action) => {
        state.roleUpdateLoading = action.meta.arg.userId
      })
      .addCase(updateMemberRole.fulfilled, (state, action) => {
        state.roleUpdateLoading = null
        const index = state.members.findIndex((m) => m.user_id === action.payload.user_id)
        if (index !== -1) {
          state.members[index] = action.payload
        }
      })
      .addCase(updateMemberRole.rejected, (state) => {
        state.roleUpdateLoading = null
      })
      // Remove member
      .addCase(removeMember.pending, (state, action) => {
        state.removeMemberLoading = action.meta.arg.userId
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.removeMemberLoading = null
        state.members = state.members.filter((m) => m.user_id !== action.payload)
      })
      .addCase(removeMember.rejected, (state) => {
        state.removeMemberLoading = null
      })
      // Revoke invitation
      .addCase(revokeInvitation.pending, (state, action) => {
        state.revokeInvitationLoading = action.meta.arg.invitationId
      })
      .addCase(revokeInvitation.fulfilled, (state, action) => {
        state.revokeInvitationLoading = null
        state.invitations = state.invitations.filter((i) => i.id !== action.payload)
      })
      .addCase(revokeInvitation.rejected, (state) => {
        state.revokeInvitationLoading = null
      })
  },
})

export const { clearMembers, clearInviteError } = membersSlice.actions
export default membersSlice.reducer
