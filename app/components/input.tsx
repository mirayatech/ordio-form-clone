import { ComponentProps } from "react";
import { cn } from "../lib/utils";

type InputFieldProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export function InputField({
  error,
  className,
  label,
  ...props
}: InputFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={props.name} className="...label styles">
        {label}
      </label>
      <input
        className={cn("border w-full px-3 py-2 rounded", className)}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs absolute -bottom-5 left-0">
          {error}
        </p>
      )}
    </div>
  );
}
