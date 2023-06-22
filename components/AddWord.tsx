import React, { useRef } from "react";

export default function AddWord(props) {
  const { words, setWords, email } = props;
  const postNewWord = async (newWord: object) => {
    try {
      const req = await fetch("http://localhost:3000/api/addWord", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          newWord: newWord,
        }),
      });
      const res = await req.json();
      console.log(res.status);
      // console.log(res === 1 && ` #${index + 1} ${newWord.Word} added"`);
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
    const newWordObj = { Word: wordInput, Translate: translateInput };

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
