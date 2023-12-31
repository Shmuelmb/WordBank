"use client";
import Word from "@/components/Word";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RemoveWord from "@/components/RemoveWord";
import AddWord from "@/components/AddWord";
import { wordType } from "@/lib/types";

export default function WordBankPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [state, setState] = useState([]);
  const [name, setName] = useState([]);
  const getData = async () => {
    if (status === "authenticated") {
      let user = session.user;
      const response = await fetch(
        `${process.env.BASE_URL ? process.env.BASE_URL : ""}/api/getUserData`,
        {
          method: "POST",
          body: JSON.stringify({
            user: user,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setState(data.words);
      setName(data.name);
    }
  };

  useEffect(() => {
    getData();
  }, [state, status]);

  useEffect(() => {
    status === "unauthenticated" && router.push("/");
  }, [status]);

  return (
    <div className="flex flex-col  items-center justify-center p-5 text-center">
      {status === "authenticated" ? (
        <div>
          <h1 className="p-9"> Hey {name && name}</h1>
          <AddWord words={state} setWords={setState} session={session} />
          <ul className="flex flex-col gap-10 items-center p-5">
            {state.map((item: wordType, index: number) => {
              return (
                <li key={index}>
                  <RemoveWord index={index} words={state} session={session} />
                  <Word
                    word={item.word}
                    translate={item.translate}
                    id={index}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h1>your bank its empty</h1>
      )}
    </div>
  );
}
