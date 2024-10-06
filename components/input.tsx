// type InputProps = {
//   label: string;
//   type: string;
//   name: string;
//   placeholder?: string;
//   className?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

import { InputField } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { useState } from "react";

// type CardProps = PropsWithChildren<{
//  title: string
// }>

// export default function Input({
//   label,
//   type,
//   name,
//   placeholder = "",
//   className = "",
//   onChange,
// }: InputProps) {
//   return (
//     <div className="relative">
//       <label
//         htmlFor={name}
//         className={`absolute -top-2 left-2 text-xs bg-white px-2`}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         className={`border w-full px-3 py-2 rounded ${className}`}
//         id={name}
//         onChange={onChange}
//       />
//     </div>
//   );
// }

function mockLogin(formState: typeof formState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formState);
    }, 1000);
  });
}

// Example usage
function SignUp() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  // Potentially extract different validations for signup and login

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    if (mode === "signup" && formState.password !== formState.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Passwords do not match",
      });
      setStatus("error");
      return;
    }

    if (mode === "signup") {
      console.log("signup");
      // here we try to sign up
      // we may have an error that email is already taken or username etc.
    } else {
      // for login/signin
      // we set a generic error message in case of hacker trying to guess the password we don't want to give them any information or hints
      try {
        const result = await mockLogin(formState);
      } catch (error) {
        setFormErrors({
          ...formErrors,
          email: "Invalid email or password.",
        });
        setStatus("error");
      }
    }
  }

  return (
    <div>
      {/* tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode("signup")}
          className={cn("border w-full px-3 py-2 rounded", {
            "bg-blue-500 text-white": mode === "signup",
          })}
        >
          Sign Up
        </button>
        <button
          onClick={() => setMode("login")}
          className={cn("border w-full px-3 py-2 rounded", {
            "bg-blue-500 text-white": mode === "login",
          })}
        >
          Login
        </button>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <InputField
          error={formErrors.email}
          name="email"
          label="Email"
          required
          onChange={(event) => handleChange(event)}
        />
        <InputField
          error={formErrors.password}
          name="password"
          label="Password"
          required
          onChange={(event) => handleChange(event)}
        />
        {mode === "signup" && (
          <InputField
            error={formErrors.confirmPassword}
            name="confirmPassword"
            label="Confirm Password"
            required
            onChange={(event) => handleChange(event)}
          />
        )}
        <Button type="submit" isLoading={status === "loading"}>
          Submit
        </Button>
      </form>
    </div>
  );
}
