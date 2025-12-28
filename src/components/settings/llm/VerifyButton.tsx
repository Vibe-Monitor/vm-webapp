'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerifyButtonProps {
  onClick: () => void
  loading: boolean
  success: boolean | null
  error: string | null
  disabled?: boolean
}

export function VerifyButton({
  onClick,
  loading,
  success,
  error,
  disabled = false,
}: VerifyButtonProps) {
  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="size-4 animate-spin" />
          Verifying...
        </>
      )
    }
    if (success === true) {
      return (
        <>
          <CheckCircle2 className="size-4 text-green-500" />
          Verified
        </>
      )
    }
    if (success === false || error) {
      return (
        <>
          <XCircle className="size-4 text-red-500" />
          Retry Verification
        </>
      )
    }
    return 'Verify Credentials'
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          'w-fit',
          success === true && 'border-green-500/50 text-green-500',
          (success === false || error) && 'border-red-500/50 text-red-500'
        )}
      >
        {getButtonContent()}
      </Button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
