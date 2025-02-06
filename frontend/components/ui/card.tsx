import * as React from "react";
import { cn } from "@/lib/utils"; // Utility for Tailwind merging

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border bg-zinc p-4 shadow-md", className)} {...props} />
  )
);
Card.displayName = "Card";

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
