import { useState } from "react";
import { cn } from "../lib/utils";

type ToggleButtonProps = {
  initialMode?: "signup" | "login";
  onToggle: (mode: "signup" | "login") => void;
};

export function ToggleButton({
  initialMode = "signup",
  onToggle,
}: ToggleButtonProps) {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);

  const handleToggle = (newMode: "signup" | "login") => {
    setMode(newMode);
    onToggle(newMode);
  };

  return (
    <div className="w-60 mx-auto flex justify-center rounded-full p-1 bg-zinc-100">
      <button
        onClick={() => handleToggle("signup")}
        className={cn("rounded-full w-full p-1 text-xs", {
          "bg-white": mode === "signup",
        })}
      >
        Sign Up
      </button>
      <button
        onClick={() => handleToggle("login")}
        className={cn("rounded-full w-full p-1 text-xs", {
          "bg-white": mode === "login",
        })}
      >
        Login
      </button>
    </div>
  );
}
