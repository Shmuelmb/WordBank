import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { wordType } from "@/lib/types";

async function addWord(email: String, newWord: wordType) {
  try {
    console.log(newWord);
    const client = await clientPromise;
    const db = client.db("WordBankApp");
    const addAct = await db
      .collection("word-bank")
      .updateOne({ email: email }, { $push: { words: newWord } });
    console.log(addAct.modifiedCount);

    if (addAct.modifiedCount === 1) {
      const user = await db.collection("word-bank").findOne({ email: email });
      if (user) {
        const newWordsList = user.words;
        return {
          status: `New word "${newWord.word}" successfully added`,
          newWordsList: newWordsList,
        };
      }
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
