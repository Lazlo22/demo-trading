import { memo, forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "radix-ui";

import { cn } from "@utils/styles";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const getButtonClasses = (variant: ButtonVariant = "default", size: ButtonSize = "default") => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 hover:scale-105 shadow-button";
  
  const variantClasses = {
    default: "bg-primary-500 text-white hover:bg-primary-600",
    destructive: "bg-danger-500 text-white hover:bg-danger-600",
    outline: "border border-primary bg-background-primary hover:bg-background-hover text-text-primary",
    secondary: "bg-background-secondary text-text-primary hover:bg-background-tertiary",
    ghost: "hover:bg-background-hover text-text-primary",
    link: "text-primary-500 underline-offset-4 hover:underline",
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp 
        className={cn(getButtonClasses(variant, size), className)} 
        ref={ref} 
        type={type}
        {...props} 
      />
    );
  }
));
Button.displayName = "Button";

export { Button };
