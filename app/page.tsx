"use client";
import SignInGoogle from "@/components/SignInGoogle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  console.log(status);

  useEffect(() => {
    status === "authenticated" && router.push("/word-bank");
  }, [status]);
  return (
    <div className="flex items-center flex-col">
      <h1>Welcome to your word bank</h1>
      <SignInGoogle />
    </div>
  );
}
