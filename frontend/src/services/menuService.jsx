const API_URL = "http://localhost:5000/mengajar";

export async function getCourseInfo(courseCode) {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Gagal mengambil data dari server");

    const data = await res.json();

    // Decode nama mata kuliah dari URL
    const decodedCourseCode = decodeURIComponent(courseCode).trim();

    // Filter dosen berdasarkan nama mata kuliah (case-insensitive)
    const course = data.filter(
      (item) =>
        item.nama_mata_kuliah.toLowerCase() === decodedCourseCode.toLowerCase()
    );

    if (course.length === 0) throw new Error("Mata kuliah tidak ditemukan");

    const lecturers = course.map((item) => item.nama);

    const menus = [
      { label: "Pembagian Kelompok Tugas Besar", page: "pembagian-kelompok" },
      { label: "Nilai", page: "nilai" },
    ];

    return {
      courseCode: decodedCourseCode,
      lecturers,
      menus,
    };
  } catch (err) {
    throw err;
  }
}
