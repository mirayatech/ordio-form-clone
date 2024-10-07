"use client";
import { InputField } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { useState } from "react";
import { cn } from "./lib/utils";

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

function mockLogin(formState: FormState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formState);
    }, 1000);
  });
}

export default function Page() {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [shake, setShake] = useState(false);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    if (mode === "signup" && formState.password !== formState.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Passwords do not match",
      });
      setStatus("error");
      setShake(true);
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
        console.log(result);
      } catch (error) {
        setFormErrors({
          ...formErrors,
          email: "Invalid email or password.",
        });
        console.log(error);
        setStatus("error");
        setShake(true);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={cn(
          "w-[350px] bg-white p-8 border flex flex-col gap-8 rounded-lg shadow-sm",
          shake ? "animate-shake" : ""
        )}
      >
        <h1 className="text-center text-xl">
          {mode === "signup" ? "Sign up" : "Sign in"}
        </h1>

        <div className="w-60 mx-auto flex justify-center rounded-full p-1 bg-zinc-100 ">
          <button
            onClick={() => setMode("signup")}
            className={cn("rounded-full w-full p-1 text-xs", {
              "bg-white": mode === "signup",
            })}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode("login")}
            className={cn("w-full rounded-full w- p-1 text-xs", {
              "bg-white": mode === "login",
            })}
          >
            Login
          </button>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <InputField
            error={formErrors.email}
            name="email"
            label="Email"
            required
            type="email"
            onChange={(event) => handleChange(event)}
            labelClassName="absolute -top-2 text-xs bg-white px-1 left-2"
            inputClassName="outline-none text-sm"
          />
          <InputField
            error={formErrors.password}
            name="password"
            label="Password"
            required
            onChange={(event) => handleChange(event)}
            type="password"
            labelClassName="absolute -top-2 text-xs bg-white px-1 left-2"
            inputClassName="outline-none text-sm"
          />
          {mode === "signup" && (
            <InputField
              error={formErrors.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              required
              onChange={(event) => handleChange(event)}
              type="password"
              labelClassName="absolute -top-2 text-xs bg-white px-1 left-2"
              inputClassName="outline-none text-sm"
            />
          )}
          <Button
            type="submit"
            isLoading={status === "loading"}
            className="rounded-md bg-primary text-white text-sm"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
