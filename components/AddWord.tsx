import React, { useRef } from "react";
import { wordType } from "@/lib/types";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { Session } from "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"];
  }
}
interface propsType {
  words: never[];
  setWords: Dispatch<SetStateAction<never[]>>;
  session: Session;
}

export default function AddWord(props: propsType) {
  const { words, setWords, session } = props;

  const postNewWord = async (newWord: wordType) => {
    try {
      const req = await fetch(
        `${process.env.BASE_URL ? process.env.BASE_URL : ""}/api/addWord`,
        {
          method: "POST",
          body: JSON.stringify({
            email: session.user?.email,
            newWord: newWord,
          }),
        }
      );
      const res = await req.json();
      console.log(res.status);
    } catch (e) {
      console.log(e);
    }
  };
  const wordInputRef = useRef<HTMLInputElement>(null);
  const translateInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const wordInput = wordInputRef.current!.value;
    const translateInput = translateInputRef.current!.value;
    const newWordObj = { word: wordInput, translate: translateInput };

    postNewWord(newWordObj);
  };

  return (
    <form
      onSubmit={todoSubmitHandler}
      className="flex flex-col gap-6 items-center ">
      <div className="flex gap-6 flex-col lg:flex-row">
        <label htmlFor="">New word:</label>
        <input
          type="text"
          placeholder="Home"
          className="border"
          ref={wordInputRef}
        />
        <label htmlFor="">Translation:</label>
        <input
          type="text"
          placeholder="בית"
          className="border"
          ref={translateInputRef}
        />
      </div>
      <button
        type="submit"
        className=" w-2/5 text-center  px-4 py-2  border rounded  hover:border-transparent hover:text-teal-500 hover:bg-white ">
        Submit
      </button>
    </form>
  );
}
