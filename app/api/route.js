import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request) {
  const timeout = 35000;
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const body = await request.json();
    const { question, limit, model } = body;
    const url = process.env.FETCH_NODE_URL;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, limit, model }),
      signal,
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (signal.aborted) {
      return res.status(408).json({ error: "Fetch request timed out" });
    }

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
