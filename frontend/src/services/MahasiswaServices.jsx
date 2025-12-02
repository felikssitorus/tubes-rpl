// Simulasi data mahasiswa
const users = [
  { email: "mahasiswa@example.com", password: "1234", name: "Mahasiswa A" },
];

const nilaiData = {
  PBW: 90,
  RPL: 85,
  "Manajemen Proyek": 80,
  "Design Antarmuka Grafis": 88,
  AI: 92,
  "Big Data": 87,
};

const kelompokData = {
  A: ["Budi", "Ani", "Citra"],
  B: ["Dedi", "Eka", "Fajar"],
  C: ["Gilang", "Hana", "Iwan"],
  D: ["Joko", "Kiki", "Lina"],
};

export default {
  login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) return { success: true, user };
    return { success: false, message: "Email atau password salah!" };
  },

  getNilai() {
    return nilaiData;
  },

  getKelompok(kode) {
    return kelompokData[kode] || [];
  }
};
