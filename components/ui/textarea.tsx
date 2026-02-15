import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-2xl border-2 border-pink-200 bg-white/90 px-4 py-3 text-sm shadow-[0_2px_0_0_rgb(251,207,232)] placeholder:text-pink-300 focus-visible:outline-none focus-visible:border-pink-400 focus-visible:shadow-[0_2px_0_0_rgb(244,114,182)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
