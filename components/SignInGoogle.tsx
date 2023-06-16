import { useSession, signIn } from "next-auth/react";
export default function SignInGoogle() {
  const { data: session, status } = useSession();

  const handle = () => {
    signIn("google");
  };
  return (
    <div>
      <button
        className={status === "authenticated" ? "hidden" : "block"}
        onClick={handle}>
        sign in with gooogle
      </button>
    </div>
  );
}
