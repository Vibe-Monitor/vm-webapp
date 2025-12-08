'use client'

import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { logoutUser } from '@/lib/features/userSlice'
import { clearWorkspaces } from '@/lib/features/workspaceSlice'

export function useLogout() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logout = async () => {
    // Dispatch logout action
    await dispatch(logoutUser())

    // Clear workspace state
    dispatch(clearWorkspaces())

    // Redirect to auth page
    router.push('/auth')
  }

  return { logout }
}
