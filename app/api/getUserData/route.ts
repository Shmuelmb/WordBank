import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { userType } from "@/lib/types";

async function getWords(user: userType) {
  const { email, name } = user;

  try {
    const client = await clientPromise;
    const db = client.db("WordBankApp");
    const checkExitsUser = await db
      .collection("word-bank")
      .findOne({ email: email });
    if (!checkExitsUser) {
      await db.collection("word-bank").insertOne({ email, name, words: [] });
    }
    return { user: checkExitsUser };
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const { user }: any = await getWords(body.user);

    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
  }
}
