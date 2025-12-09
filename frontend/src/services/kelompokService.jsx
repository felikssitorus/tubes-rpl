import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";

// Ambil semua kelompok + anggota
export const fetchKelompok = async (idMkDibuka) => {
  try {
    const res = await axios.get(`${BASE_URL}/${idMkDibuka}`);
    return res.data;
  } catch (err) {
    console.error("Gagal fetch kelompok:", err);
    return {};
  }
};

// Ambil kelompok mahasiswa login
export const fetchKelompokMahasiswa = async (idMkDibuka, npm) => {
  try {
    const res = await axios.get(`${BASE_URL}/${idMkDibuka}/mahasiswa/${npm}`);
    return res.data || null;
  } catch (err) {
    console.error("Gagal fetch kelompok mahasiswa:", err);
    return null;
  }
};

// NOTE: jika backend ada endpoint POST untuk join kelompok, tambahkan di sini
