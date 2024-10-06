"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "./input";

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function Form() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (isSignUp) {
      console.log("User signed up:", formData);
    } else {
      console.log("User signed in:", formData);
    }

    router.push(`/welcome?name=${formData.email}`);
  };

  return (
    <form
      className={`w-[350px] bg-white px-8 py-6 pb-4 border rounded-lg shadow-sm ${
        shake ? "animate-shake" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-xl">
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>

        <div className="flex justify-center rounded-full p-1 bg-zinc-100 mb-10">
          <button
            type="button"
            className={`w-28 rounded-full p-1 text-xs ${
              !isSignUp ? "bg-white" : ""
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`w-28 rounded-full p-1 text-xs ${
              isSignUp ? "bg-white" : ""
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="E-mail Adresse"
          type="email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}

        <Input
          label="Passwort"
          type="password"
          name="password"
          onChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}

        {isSignUp && (
          <>
            <Input
              label="Confirm Passwort"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </>
        )}

        <button
          className="bg-primary p-2 text-xs border w-full text-white rounded-lg"
          type="submit"
        >
          {isSignUp ? "Sign up" : "Sign in"}
        </button>
      </div>

      <div className="border-t pt-4 mt-4 text-[10px] text-center text-black/40">
        {!isSignUp && (
          <p>
            Forgot your password?{" "}
            <Link href="/" target="_blank" className="text-primary/80">
              Reset here.
            </Link>
          </p>
        )}
        <p>
          By signing {isSignUp ? "up" : "in"}, you accept our{" "}
          <Link href="/" target="_blank" className="text-primary/80">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
