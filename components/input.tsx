type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type,
  name,
  placeholder = "",
  className = "",
  onChange,
}: InputProps) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute -top-2 left-2 text-xs bg-white px-2`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`border w-full px-3 py-2 rounded ${className}`}
        id={name}
        onChange={onChange}
      />
    </div>
  );
}
