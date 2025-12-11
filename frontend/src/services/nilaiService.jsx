const BASE_URL = "http://localhost:5000";

// Nilai lengkap (tanpa filter)
export async function getNilaiMhs(npm) {
  try {
    const res = await fetch(`${BASE_URL}/nilai-mhs/${npm}`);
    if (!res.ok) throw new Error("Gagal mengambil data nilai");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// List tubes untuk dropdown
export async function getTubesList(npm) {
  try {
    const res = await fetch(`${BASE_URL}/nilai-mhs/tubes/${npm}`);
    if (!res.ok) throw new Error("Gagal mengambil list tubes");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Nilai berdasarkan tubes tertentu
export async function getNilaiByTubes(npm, idTubes) {
  try {
    const res = await fetch(`${BASE_URL}/nilai-mhs/${npm}/tubes/${idTubes}`);
    if (!res.ok) throw new Error("Gagal mengambil nilai tubes");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
