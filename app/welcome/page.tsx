"use client";

import { useSearchParams } from "next/navigation";

export default function Welcome() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-3xl">Hello, {name || "Guest"}!</h1>
    </div>
  );
}
