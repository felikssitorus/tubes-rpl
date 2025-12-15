// src/services/dashboardService.js
const API_URL = "http://localhost:5000/mk-diambil";

export async function getMkDiambilByEmail(email) {
  try {
    const res = await fetch(`${API_URL}/${email}`);
    if (!res.ok) throw new Error("Gagal mengambil data mata kuliah");
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
