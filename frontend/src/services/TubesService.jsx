const API_URL = "http://localhost:5000/api/tubes";

export const getAllTubes = async (id_mk_dibuka = null) => {
  const url = id_mk_dibuka ? `${API_URL}?id_mk_dibuka=${id_mk_dibuka}` : API_URL;
  const res = await fetch(url);
  return res.json();
};

export const getTubes = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createTubes = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTubes = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTubes = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};