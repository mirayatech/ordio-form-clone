"use client";

import { InputField } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { useState } from "react";

type FormState = {
  email: string;
  password: string;
};

function mockLogin(formState: FormState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formState);
    }, 1000);
  });
}

export default function SignIn() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    email: "",
    password: "",
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

    try {
      const result = await mockLogin(formState);
      console.log(result);
      setStatus("success");
    } catch (error) {
      setFormErrors({
        ...formErrors,
        email: "Invalid email or password.",
      });
      console.log(error);
      setStatus("error");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[350px] bg-white p-8 border flex flex-col gap-8 rounded-lg shadow-sm">
        <h1 className="text-center text-xl">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            error={formErrors.email}
            name="email"
            label="Email"
            required
            onChange={(event) => handleChange(event)}
            labelClassName="absolute -top-2 text-xs bg-white px-1 left-2"
            inputClassName="outline-none"
          />
          <InputField
            error={formErrors.password}
            name="password"
            label="Password"
            required
            onChange={(event) => handleChange(event)}
            labelClassName="absolute -top-2 text-xs bg-white px-1 left-2"
            inputClassName="outline-none"
          />
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
