import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-[0_4px_0_0_rgb(219,39,119)] hover:shadow-[0_2px_0_0_rgb(219,39,119)] hover:translate-y-[2px] border-2 border-pink-400",
        destructive:
          "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-[0_4px_0_0_rgb(220,38,38)] hover:shadow-[0_2px_0_0_rgb(220,38,38)] hover:translate-y-[2px] border-2 border-red-400",
        outline:
          "border-2 border-pink-300 bg-white/80 text-pink-600 shadow-[0_4px_0_0_rgb(249,168,212)] hover:shadow-[0_2px_0_0_rgb(249,168,212)] hover:translate-y-[2px] hover:bg-pink-50",
        secondary:
          "bg-gradient-to-r from-purple-300 to-purple-400 text-white shadow-[0_4px_0_0_rgb(168,85,247)] hover:shadow-[0_2px_0_0_rgb(168,85,247)] hover:translate-y-[2px] border-2 border-purple-300",
        ghost: "hover:bg-pink-100/50 text-pink-600 hover:text-pink-700",
        link: "text-pink-500 underline-offset-4 hover:underline font-semibold",
        cute: "bg-gradient-to-r from-yellow-300 to-orange-300 text-yellow-900 shadow-[0_4px_0_0_rgb(251,191,36)] hover:shadow-[0_2px_0_0_rgb(251,191,36)] hover:translate-y-[2px] border-2 border-yellow-300",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
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
