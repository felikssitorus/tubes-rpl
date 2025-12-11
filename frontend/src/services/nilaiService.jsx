const BASE_URL = "http://localhost:5000";

export async function getNilaiMhs(npm) {
  try {
    const res = await fetch(`${BASE_URL}/nilai-mhs/${npm}`);
    
    if (!res.ok) throw new Error("Gagal mengambil data nilai");

    const json = await res.json();
    return json.data ?? json;
  } catch (err) {
    console.error(err);
    return [];
  }
}
