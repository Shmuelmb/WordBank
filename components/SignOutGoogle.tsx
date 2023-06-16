import { useSession, signOut } from "next-auth/react";

export default function SignOutGoogle() {
  const { data: session, status } = useSession();

  const handle = () => {
    signOut();
  };
  return (
    <div>
      <button
        disabled={`${status}` === "unauthenticated" && true}
        className={
          `${status}` === "unauthenticated"
            ? "inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-slate-300"
            : "inline-block text-sm px-4 py-2 leading-none border rounded text-white  hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        }
        onClick={handle}>
        sign out
      </button>
    </div>
  );
}
