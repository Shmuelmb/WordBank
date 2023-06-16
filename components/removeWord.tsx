export default function RemoveWord(props) {
  const { index, words, setWords, email } = props;

  const removeWord = async () => {
    let removedWord;
    //       setWords(
    //     words.filter((x: object) => {
    //       return x !== words[index];
    //     })
    //   );
    words.filter((x: object) => {
      if (x === words[index]) {
        removedWord = x;
      }
    });
    try {
      const req = await fetch("http://localhost:3000/api/deleteWord", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          word: removedWord,
        }),
      });
      const res = await req.json();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={removeWord}>למחוק</button>;
}
