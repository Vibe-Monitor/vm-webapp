'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface RoleSelectorProps {
  value: 'owner' | 'user'
  onChange: (value: 'owner' | 'user') => void
  disabled?: boolean
  isOwner?: boolean
}

export function RoleSelector({ value, onChange, disabled, isOwner }: RoleSelectorProps) {
  if (isOwner && value === 'owner') {
    return (
      <span className="text-sm text-[var(--color-text-secondary)]">Owner</span>
    )
  }

  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as 'owner' | 'user')}
      disabled={disabled}
    >
      <SelectTrigger className="w-24 h-8 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
        <SelectItem value="user">User</SelectItem>
      </SelectContent>
    </Select>
  )
}
