const API_URL = "http://localhost:5000/user";

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Email atau password salah");
  }

  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API_URL}`);
  return res.json();
}
