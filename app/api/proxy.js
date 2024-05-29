import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:8001/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "amfetamina",
      }),
    });
    const data = await response.json();
    res.status(200).json({ dziala: "lol" });
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas przekierowywania zapytania." });
  }
}
