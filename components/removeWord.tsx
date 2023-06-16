export default function RemoveWord(props) {
  const { index, words, setWords, email } = props;

  const postRemovedWord = async () => {
    let removeThisWord;

    words.filter((x: object) => {
      if (x === words[index]) {
        removeThisWord = x;
      }
    });
    try {
      const req = await fetch("http://localhost:3000/api/deleteWord", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          itemToRemoved: removeThisWord,
        }),
      });
      const res = await req.json();
      console.log(
        res === 1 && ` #${index + 1} ${removeThisWord.Word} removed"`
      );
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={postRemovedWord}>למחוק</button>;
}
