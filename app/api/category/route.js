import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, type } = body;
    const url = process.env.FETCH_NODE_CAT_URL;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, type }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
