import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Primary brand action — ink black with white text (Rule 2) */
        default:
          "bg-primary text-primary-foreground shadow-2xs hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.98]",
        /** Hero CTA — authoritative ink black button */
        cta: "btn-cta text-primary-foreground shadow-2xs hover:opacity-90 active:scale-[0.98]",
        /** Destructive — accessible red */
        destructive:
          "bg-destructive text-destructive-foreground shadow-2xs hover:bg-destructive/90 active:scale-[0.98]",
        /** Secondary action — transparent ivory button with subtle warm border (Rule 3) */
        outline:
          "border border-border bg-transparent text-foreground shadow-2xs hover:bg-black/5 hover:border-foreground/30 active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground shadow-2xs hover:bg-secondary/80",
        ghost: "hover:bg-black/5 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        /** Learning / progress / completion — forest green */
        success:
          "bg-success text-success-foreground shadow-2xs hover:bg-success/90 active:scale-[0.98]",
        /** Practice / quiz / highlight actions — muted olive (Rule 4) */
        quiz: "bg-quiz text-quiz-foreground shadow-2xs hover:bg-[#636845] active:scale-[0.98]",
        /** Important attention / warning actions — warm amber */
        warning:
          "bg-warning text-warning-foreground shadow-2xs hover:bg-warning/90 active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
