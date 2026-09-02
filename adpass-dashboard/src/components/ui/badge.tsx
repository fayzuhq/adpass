import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "danger" | "warning" | "outline" | "nsfw";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "border-transparent bg-success text-success-foreground hover:bg-success/80": variant === "success",
          "border-transparent bg-danger text-danger-foreground hover:bg-danger/80": variant === "danger",
          "border-transparent bg-orange-500 text-white hover:bg-orange-500/80": variant === "warning",
          "border-transparent bg-pink-500 text-white hover:bg-pink-500/80": variant === "nsfw",
          "text-foreground border-white/10": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
