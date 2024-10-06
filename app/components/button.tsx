import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  isLoading?: boolean;
};

// cva

export function Button({
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn("border w-full px-3 py-2 rounded", className)}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
