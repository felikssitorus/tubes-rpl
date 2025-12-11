const API_URL = "http://localhost:5000/api/matkul";

export const getAllMatkul = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getMatkul = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};