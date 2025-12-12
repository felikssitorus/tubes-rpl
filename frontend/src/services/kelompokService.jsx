import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";

// Ambil seluruh kelompok pada tubes tertentu
export const getKelompokTubes = async (idTubes) => {
  const res = await axios.get(`${BASE_URL}/tubes/${idTubes}`);
  return res.data;
};

// Ambil kelompok mahasiswa
export const getKelompokMahasiswa = async (idTubes, npm) => {
  const res = await axios.get(`${BASE_URL}/tubes/${idTubes}/mahasiswa/${npm}`);
  return res.data;
};

// Join kelompok
export const joinKelompok = async (idTubes, namaKelompok, npm) => {
  return axios.post(`${BASE_URL}/join`, {
    idTubes,
    namaKelompok,
    npm
  });
};
