const API_URL = "http://localhost:5000/api/komponen";

export const getAllKomponen = async (id_tubes) => {
  const url = id_tubes ? `${API_URL}?id_tubes=${id_tubes}` : API_URL;
  const res = await fetch(url);
  return res.json();
};

export const getKomponen = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createKomponen = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  if (!res.ok) {
    throw responseData;
  }
  return responseData;
};

export const updateKomponen = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  if (!res.ok) {
    throw responseData;
  }
  return responseData;
};

export const deleteKomponen = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  
  return res.json();
};