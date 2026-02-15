import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 text-white shadow-[0_6px_0_0_rgb(190,24,93),0_10px_20px_-5px_rgb(219,39,119,0.3)] hover:shadow-[0_4px_0_0_rgb(190,24,93),0_8px_15px_-3px_rgb(219,39,119,0.3)] hover:translate-y-[2px] border-2 border-pink-300/50",
        destructive: "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-[0_6px_0_0_rgb(190,38,38),0_10px_20px_-5px_rgb(220,38,38,0.3)] hover:shadow-[0_4px_0_0_rgb(190,38,38),0_8px_15px_-3px_rgb(220,38,38,0.3)] hover:translate-y-[2px] border-2 border-red-300/50",
        outline: "border-2 border-pink-300 bg-white/80 text-pink-600 shadow-[0_4px_0_0_rgb(251,207,232),0_6px_15px_-3px_rgb(219,39,119,0.1)] hover:shadow-[0_2px_0_0_rgb(251,207,232),0_4px_10px_-2px_rgb(219,39,119,0.1)] hover:translate-y-[2px] hover:bg-pink-50",
        secondary: "bg-gradient-to-r from-purple-400 to-purple-300 text-white shadow-[0_6px_0_0_rgb(147,51,234),0_10px_20px_-5px_rgb(147,51,234,0.3)] hover:shadow-[0_4px_0_0_rgb(147,51,234),0_8px_15px_-3px_rgb(147,51,234,0.3)] hover:translate-y-[2px] border-2 border-purple-300/50",
        ghost: "hover:bg-pink-100/70 text-pink-600 hover:text-pink-700",
        link: "text-pink-500 underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-11 w-11 rounded-xl",
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