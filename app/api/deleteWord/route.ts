import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { wordType } from "@/lib/types";

async function removeWord(email: string, itemToRemoved: wordType) {
  try {
    const client = await clientPromise;
    const db = client.db("WordBankApp");
    const deleteAct = await db
      .collection("word-bank")
      .updateOne({ email: email }, { $pull: { words: itemToRemoved } });
    console.log(deleteAct);

    return { deleteAct };
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, itemToRemoved } = body;
  try {
    const { deleteAct }: any = await removeWord(email, itemToRemoved);
    return NextResponse.json(deleteAct.modifiedCount);
  } catch (e) {
    console.log(e);
  }
}
