import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-300",
  {
    variants: {
      variant: {
        default: "bg-primary-900 text-white hover:bg-primary-800 shadow-lg shadow-primary-900/20",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/5 text-white backdrop-blur-md",
        secondary:
          "bg-white text-primary-950 hover:bg-white/90 shadow-lg shadow-white/10",
        ghost: "hover:bg-white/10 hover:text-white",
        link: "text-accent-400 underline-offset-4 hover:underline",
        accent: "bg-accent-500 text-primary-950 hover:bg-accent-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] font-bold",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
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
