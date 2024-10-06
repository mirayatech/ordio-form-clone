import dynamic from "next/dynamic";

const Form = dynamic(() => import("../components/form"));

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Form />
    </div>
  );
}
