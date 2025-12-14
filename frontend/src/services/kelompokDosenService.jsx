const API_URL = "http://localhost:5000/api/kelompok-dosen";

export const getAllKelompokByTubes = async (id_tubes) => {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}`);
  return res.json();
};

export const getKelompokById = async (id_kelompok) => {
  const res = await fetch(`${API_URL}/${id_kelompok}`);
  return res.json();
};

export const generateKelompok = async (data) => {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const responseData = await res.json();
  return responseData;
};

export const updateMaxAnggota = async (id_kelompok, max_anggota) => {
  const res = await fetch(`${API_URL}/${id_kelompok}/max-anggota`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ max_anggota }),
  });
  
  const responseData = await res.json();
  return responseData;
};

export const removeAnggota = async (npm, id_kelompok) => {
  const res = await fetch(`${API_URL}/anggota/${npm}/${id_kelompok}`, {
    method: "DELETE",
  });
  return res.json();
};

export const getLockStatus = async (id_tubes) => {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/lock-status`);
  return res.json();
};

export const lockTubes = async (id_tubes) => {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/lock`, {
    method: "PUT",
  });
  
  const responseData = await res.json();
  return responseData;
};

export const unlockTubes = async (id_tubes) => {
  const res = await fetch(`${API_URL}/tubes/${id_tubes}/unlock`, {
    method: "PUT",
  });
  
  const responseData = await res.json();
  
  return responseData;
};

export const createKelompok = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const responseData = await res.json();
  return responseData;
};

export const updateKelompok = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const responseData = await res.json();
  return responseData;
};

export const getMahasiswaAvailable = async (id_tubes, kelas) => {
  const res = await fetch(`${API_URL}/mahasiswa/available/${id_tubes}/${kelas}`);
  return res.json();
};

export const getMahasiswaInKelompok = async (id_tubes, kelas) => {
  const res = await fetch(`${API_URL}/mahasiswa/in-kelompok/${id_tubes}/${kelas}`);
  return res.json();
};

export const assignMahasiswa = async (data) => {
  const res = await fetch(`${API_URL}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const responseData = await res.json();
  
  return responseData;
};