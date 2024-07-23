import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(request: any) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const url = `${process.env.FETCH_NODE_TEXT_URL}?id=${id}`;

    console.log("🚀 ~ GET ~ url:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
