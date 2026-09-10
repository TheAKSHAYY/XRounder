import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        /** Learning / completion — green pill */
        success:
          "border-transparent bg-success/15 text-success dark:bg-success/20",
        /** Practice / quiz / AI — violet-purple pill */
        quiz:
          "border-transparent bg-quiz/15 text-quiz dark:bg-quiz/20",
        /** Attention / important — amber pill */
        warning:
          "border-transparent bg-warning/20 text-warning-foreground dark:text-warning",
        /** Informational — blue pill */
        info:
          "border-transparent bg-info/15 text-info dark:bg-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
