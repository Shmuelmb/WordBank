import { wordType } from "@/lib/types";

interface propsType {
  index: number;
  words: never[];
  session: any;
}
export default function RemoveWord(props: propsType) {
  const { index, words, session } = props;
  let removeThisWord: wordType;

  const postRemovedWord = async () => {
    words.filter((x: wordType) => {
      if (x === words[index]) {
        removeThisWord = x;
      }
    });
    try {
      const req = await fetch(
        `${process.env.BASE_URL ? process.env.BASE_URL : ""}/api/deleteWord`,
        {
          method: "POST",
          body: JSON.stringify({
            email: session.user.email,
            itemToRemoved: removeThisWord,
          }),
        }
      );
      const res = await req.json();
      console.log(
        res === 1 && ` #${index + 1} "${removeThisWord.word}" removed"`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={postRemovedWord}>Delete this word</button>;
}
