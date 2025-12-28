import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-button-dark)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-button-dark)] text-white shadow-xs hover:bg-[var(--color-button-dark-hover)]",
        destructive:
          "bg-[var(--color-error)] text-white shadow-xs hover:bg-[var(--color-error-dark)]",
        outline:
          "border border-[var(--color-border)] bg-[var(--color-background)] shadow-xs hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
        secondary:
          "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] shadow-xs hover:bg-[var(--color-surface-hover)]",
        ghost:
          "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
        link: "text-[var(--color-button-blue)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
