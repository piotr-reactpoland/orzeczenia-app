import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, limit, model, less } = body;
    const url = process.env.FETCH_NODE_URL;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        limit: "6",
        model: "OrlikB/st-polish-kartonberta-base-alpha-v1",
        question: "amfetamina",
        less: false,
      }),
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
