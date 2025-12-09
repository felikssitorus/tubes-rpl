const API_URL = "http://localhost:5000/kelompok";

export async function getMahasiswaByKelas(kelas) {
  const res = await fetch(`${API_URL}/mahasiswa/kelas/${kelas}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getMahasiswaAvailable(id_tubes, kelas) {
  const res = await fetch(`${API_URL}/mahasiswa/available/${id_tubes}/${kelas}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getMahasiswaInKelompok(id_tubes, kelas) {
  const res = await fetch(`${API_URL}/mahasiswa/in-kelompok/${id_tubes}/${kelas}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function assignMahasiswa(assignments) {
  const res = await fetch(`${API_URL}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assignments })
  });
  if (!res.ok) throw new Error("Failed to assign");
  return res.json();
}