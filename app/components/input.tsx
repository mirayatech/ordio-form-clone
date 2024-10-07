import { ComponentProps } from "react";
import { cn } from "../lib/utils";

type InputFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export function InputField({
  error,
  labelClassName,
  inputClassName,
  label,
  ...props
}: InputFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={props.name} className={cn(labelClassName)}>
        {label}
      </label>
      <input
        className={cn("border w-full p-3 rounded", inputClassName)}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs absolute -bottom-4 left-1">
          {error}
        </p>
      )}
    </div>
  );
}
