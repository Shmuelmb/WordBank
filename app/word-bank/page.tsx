"use client";

import Word from "@/components/Word";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveWord from "@/components/RemoveWord";
import AddWord from "@/components/AddWord";
interface WordObj {
  Word: String;
  Translate: String;
}

export default function WordBankPage() {
  const rotuer = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = useState([]);
  const getData = async () => {
    if (status === "authenticated") {
      const response = await fetch("http://localhost:3000/api/getUserData", {
        method: "POST",
        body: JSON.stringify({
          email: session.user.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setState(data.words);
    }
  };

  useEffect(() => {
    getData();
  }, [state, status]);

  useEffect(() => {
    status === "unauthenticated" && rotuer.push("/");
  }, [status]);

  return (
    <div className="flex flex-col  items-center justify-center p-5">
      {state.length > 0 && (
        <AddWord words={state} setWords={setState} email={session.user.email} />
      )}
      <ul className="flex flex-col gap-10 ">
        {state.length > 0 ? (
          state.map((item: WordObj, index: number) => {
            return (
              <li key={index}>
                <RemoveWord
                  index={index}
                  words={state}
                  setWords={setState}
                  email={session.user.email}
                />
                <Word word={item.Word} translate={item.Translate} id={index} />
              </li>
            );
          })
        ) : (
          <h1>your bank its empty</h1>
        )}
      </ul>
    </div>
  );
}
