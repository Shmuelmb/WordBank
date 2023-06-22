import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function addWord(email: String, newWord: object) {
  try {
    const client = await clientPromise;
    const db = client.db("local");
    const addAct = await db
      .collection("word-bank")
      .updateOne({ Email: email }, { $push: { words: newWord } });
    console.log(addAct.modifiedCount);

    if (addAct.modifiedCount === 1) {
      const user = await db.collection("word-bank").findOne({ Email: email });
      const newWordsList = user.words;
      return {
        status: `New word ${newWord.Word} successfully added`,
        newWordsList: newWordsList,
      };
    }
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, newWord } = body;
  try {
    const newWordRes = await addWord(email, newWord);
    return NextResponse.json(newWordRes);
  } catch (e) {
    console.log(e);
  }
}
