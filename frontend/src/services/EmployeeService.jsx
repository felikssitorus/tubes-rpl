const API_URL = "http://localhost:5000/employees";

export async function getEmployees() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createEmployee(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateEmployee(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
