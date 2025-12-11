const API_URL = "http://localhost:5000/tubes";

export async function getAllTubes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getTubesById(id_tubes) {
  const res = await fetch(`${API_URL}/${id_tubes}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getTubesByMataKuliah(id_mk_dibuka) {
  const res = await fetch(`${API_URL}/matakuliah/${id_mk_dibuka}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function createTubes(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to create");
  return res.json();
}

export async function updateTubes(id_tubes, data) {
  const res = await fetch(`${API_URL}/${id_tubes}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export async function deleteTubes(id_tubes) {
  const res = await fetch(`${API_URL}/${id_tubes}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
}