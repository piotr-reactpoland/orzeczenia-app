import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(request) {
  try {
    const response = await fetch("http://3.16.160.92/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: "amfetamina" }),
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

export async function POST(request) {
  // Obsługa żądania POST
  return NextResponse.json({ message: "Post request received" });
}
