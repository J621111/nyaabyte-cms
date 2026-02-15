import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 text-white shadow-[0_4px_10px_rgba(236,72,153,0.3)] hover:shadow-[0_6px_15px_rgba(236,72,153,0.4)] hover:-translate-y-0.5 border border-pink-200/50",
        destructive: "bg-red-400 text-white shadow-[0_4px_10px_rgba(248,113,113,0.3)] hover:shadow-[0_6px_15px_rgba(248,113,113,0.4)] hover:-translate-y-0.5",
        outline: "border-2 border-pink-200 bg-white text-pink-500 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 shadow-sm hover:shadow-md",
        secondary: "bg-purple-100 text-purple-600 hover:bg-purple-200 border border-purple-200 shadow-sm hover:shadow-md",
        ghost: "hover:bg-pink-50 text-pink-500 hover:text-pink-600",
        link: "text-pink-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }