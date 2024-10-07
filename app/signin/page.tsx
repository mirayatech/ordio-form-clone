"use client";

import { InputField } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { useState } from "react";

function mockLogin(formState: typeof formState) {
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
    <div>
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
        <Button type="submit" isLoading={status === "loading"}>
          Submit
        </Button>
      </form>
    </div>
  );
}
