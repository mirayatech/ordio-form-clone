import { ComponentProps } from "react";
import { cn } from "../lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={cn("border w-full px-3 py-2", className)}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}
