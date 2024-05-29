import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("http://3.16.160.92/find");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas przekierowywania zapytania." });
  }
}
