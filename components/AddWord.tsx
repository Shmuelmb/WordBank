export default function AddWord(props) {
  const { index, words, setWords, email } = props;

  const postNewWord = async () => {
    let newWord;

    words.filter((x: object) => {
      if (x === words[index]) {
        newWord = x;
      }
    });
    try {
      const req = await fetch("http://localhost:3000/api/addWord", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          newWord: newWord,
        }),
      });
      const res = await req.json();
      console.log(res === 1 && ` #${index + 1} ${newWord.Word} added"`);
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={postNewWord}>למחוק</button>;
}
