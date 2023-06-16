import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function addWord(email: String, newWord: object) {
  try {
    const client = await clientPromise;
    const db = client.db("local");
    const addAct = await db
      .collection("word-bank")
      .updateOne({ Email: email }, { $push: { words: newWord } });

    return { addAct };
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, newWord } = body;
  try {
    const { addAct }: any = await addWord(email, newWord);

    return NextResponse.json(addAct.modifiedCount);
  } catch (e) {
    console.log(e);
  }
}
