const API_URL = "http://localhost:5000/rubrik";

export async function getAllRubrik() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createRubrik(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}