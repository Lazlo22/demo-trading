
import { memo, forwardRef, type ComponentProps } from "react"

import { cn } from "@utils/styles"

const Input = memo(forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white font-medium ring-offset-white dark:ring-offset-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 dark:file:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
))
Input.displayName = "Input"

export { Input }
