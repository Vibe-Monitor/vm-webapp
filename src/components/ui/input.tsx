import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const defaultStyle = {
    backgroundColor: 'var(--color-background-dropdown)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-[var(--color-text-tertiary)]",
        className
      )}
      style={{
        ...defaultStyle,
        ...props.style
      }}
      onFocus={(e) => {
        if (!props.style?.backgroundColor) {
          e.target.style.backgroundColor = 'var(--color-background-dropdown)';
        }
        if (!props.style?.borderColor) {
          e.target.style.borderColor = 'var(--color-border-light)';
        }
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        if (!props.style?.backgroundColor) {
          e.target.style.backgroundColor = 'var(--color-background-dropdown)';
        }
        if (!props.style?.borderColor) {
          e.target.style.borderColor = 'var(--color-border)';
        }
        props.onBlur?.(e);
      }}
      {...props}
    />
  )
}

export { Input }
