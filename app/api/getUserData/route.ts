import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { use } from "react";

async function getWords(email) {
  try {
    const client = await clientPromise;
    const db = client.db("local");
    const user = await db.collection("word-bank").findOne({ Email: email });

    return { user: user };
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  try {
    const { user } = await getWords(body.email);

    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
  }
}
