"use client";

interface propsObj {
  word: String;
  translate: String;
  id: number;
}

export default function Word(props: propsObj) {
  const { word, translate, id } = props;
  const hiddenTranslate = () => {
    const p = document.querySelector(`[id='${id}']`) as HTMLParagraphElement;

    p.className === "hidden"
      ? (p.className = "text-2xl block")
      : (p.className = "hidden");
  };
  return (
    <div className="flex h-40 text-center gap-5 flex-col border w-72 border-cyan-950">
      <span>#{id + 1}</span>
      <span className=" text-4xl cursor-pointer" onClick={hiddenTranslate}>
        {word}
      </span>
      <span className="hidden" id={`${id}`}>
        {translate}
      </span>
    </div>
  );
}
