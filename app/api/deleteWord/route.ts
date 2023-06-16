import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

async function removeWord(email, itemToRemoved) {
  try {
    const client = await clientPromise;
    const db = client.db("local");
    const deleteAct = await db
      .collection("word-bank")
      .updateOne({ Email: email }, { $pull: { words: itemToRemoved } });

    return { deleteAct };
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { email, itemToRemoved } = body;
  try {
    const { deleteAct } = await removeWord(email, itemToRemoved);

    return NextResponse.json(deleteAct.modifiedCount);
  } catch (e) {
    console.log(e);
  }
}
