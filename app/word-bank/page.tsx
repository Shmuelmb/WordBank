"use client";

import Word from "@/components/Word";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
      const response = await fetch("http://localhost:3000/api/getData", {
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
  }, []);

  useEffect(() => {
    status === "unauthenticated" && rotuer.push("/");
  }, [status]);

  const removeWord = (x) => {
    console.log(x.target.value);
  };

  return (
    <div className="flex flex-col  items-center justify-center p-5">
      <ul className="flex flex-col gap-10 ">
        {state &&
          state.map((item: WordObj, index: number) => {
            return (
              <li key={index}>
                <button
                  onClick={() => {
                    console.log(state[index]);
                    setState(
                      state.filter((x) => {
                        return x !== state[index];
                      })
                    );
                  }}>
                  למחוק
                </button>
                <Word word={item.Word} translate={item.Translate} id={index} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
