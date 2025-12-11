const API_URL = "http://localhost:5000/kelompok";

export async function getAllKelompok() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getKelompokByTubes(id_tubes) {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getKelompokById(id_kelompok) {
  const res = await fetch(`${API_URL}/${id_kelompok}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function generateKelompok(data) {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to generate");
  return res.json();
}

export async function addAnggota(data) {
  const res = await fetch(`${API_URL}/anggota`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to add anggota");
  return res.json();
}

export async function removeAnggota(npm, id_kelompok) {
  const res = await fetch(`${API_URL}/anggota/${npm}/${id_kelompok}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to remove anggota");
  return res.json();
}

export async function updateMaxAnggota(id_kelompok, max_anggota) {
  const res = await fetch(`${API_URL}/${id_kelompok}/max-anggota`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ max_anggota })
  });
  if (!res.ok) throw new Error("Failed to update max anggota");
  return res.json();
}

export async function deleteKelompok(id_kelompok) {
  const res = await fetch(`${API_URL}/${id_kelompok}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
}

export async function getLockStatus(id_tubes) {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/lock-status`);
  if (!res.ok) throw new Error("Failed to get lock status");
  return res.json();
}

export async function lockTubes(id_tubes) {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/lock`, {
    method: "PUT"
  });
  if (!res.ok) throw new Error("Failed to lock tubes");
  return res.json();
}

export async function unlockTubes(id_tubes) {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/unlock`, {
    method: "PUT"
  });
  if (!res.ok) throw new Error("Failed to unlock tubes");
  return res.json();
}