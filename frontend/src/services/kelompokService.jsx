import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";

// Ambil semua kelompok + anggota
export const fetchKelompok = async (idMkDibuka) => {
  try {
    const res = await axios.get(`${BASE_URL}/mk/${idMkDibuka}`);
    return res.data;
  } catch (err) {
    console.error("Gagal fetch kelompok:", err);
    return {};
  }
};

// Ambil kelompok mahasiswa login
export const fetchKelompokMahasiswa = async (idTubes, npm) => {
  try {
    const res = await axios.get(`${BASE_URL}/tubes/${idTubes}/mahasiswa/${npm}`);
    return res.data || null;
  } catch (err) {
    console.error("Gagal fetch kelompok mahasiswa:", err);
    return null;
  }
};

// Join kelompok
export const joinKelompok = async (idTubes, namaKelompok, npm) => {
  try {
    const res = await axios.post(`${BASE_URL}/join`, { idTubes, namaKelompok, npm });
    return res.data;
  } catch (err) {
    console.error("Gagal join kelompok:", err);
    return { message: err.response?.data?.message || "Gagal join kelompok" };
  }
};
