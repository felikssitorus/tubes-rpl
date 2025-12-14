const API_URL = "http://localhost:5000/api/mengajar";



export async function getCourseInfo(idMkDibuka) {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Gagal mengambil data dari server");

    const data = await res.json();

    // Filter dosen berdasarkan id_mk_dibuka
    const course = data.filter(
      (item) => item.id_mk_dibuka === parseInt(idMkDibuka)
    );

    if (course.length === 0) throw new Error("Mata kuliah tidak ditemukan");

    // ambil nama dosen
    const dosen = course.map((item) => item.nama);

    // ambil nama mata kuliah
    const namaMataKuliah = course[0].nama_mata_kuliah;

    // menu
    const menus = [
      { label: "Pembagian Kelompok Tugas Besar", page: "pembagian-kelompok" },
      { label: "Nilai", page: "nilai" },
    ];

    return {
      courseCode: namaMataKuliah,
      dosen,
      menus,
      idMkDibuka: parseInt(idMkDibuka),
    };
  } catch (err) {
    throw err;
  }
}