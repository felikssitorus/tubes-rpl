const API_URL = "http://localhost:5000/mk-diambil";

// Fungsi untuk mendapatkan data mata kuliah yang diajarkan oleh admin/dosen
export async function getMkDiambilByEmail(email) {
    try {
        const res = await fetch(`${API_URL}/${email}`);
        if (!res.ok) throw new Error("Gagal mengambil data mata kuliah");
        const data = await res.json();

        // Mock data jika API belum ready
        if (!data.mata_kuliah || data.mata_kuliah.length === 0) {
            return {
                mata_kuliah: [
                    {
                        nama_mata_kuliah: "Rekayasa Perangkat Lunak",
                        kode_mata_kuliah: "AIF233101-04",
                        semester: "Ganjil",
                        tahun: "2024/2025",
                        kelas: "A",
                        dosen: "Dr. Ahmad Rizal, M.Kom.",
                        jumlah_mahasiswa: 40,
                        jumlah_kelompok: 8
                    },
                    {
                        nama_mata_kuliah: "Pemrograman Berbasis Web",
                        kode_mata_kuliah: "AIF233102-01",
                        semester: "Ganjil",
                        tahun: "2024/2025",
                        kelas: "B",
                        dosen: "Prof. Siti Aminah, Ph.D.",
                        jumlah_mahasiswa: 35,
                        jumlah_kelompok: 7
                    }
                ]
            };
        }

        return data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
}

// Fungsi untuk menambah mata kuliah baru
export async function addNewCourse(courseData) {
    try {
        const res = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        });

        if (!res.ok) throw new Error("Gagal menambahkan mata kuliah");
        return await res.json();
    } catch (error) {
        console.error("Error adding new course:", error);
        throw error;
    }
}

// Fungsi untuk menghapus mata kuliah
export async function deleteCourse(courseId) {
    try {
        const res = await fetch(`${API_URL}/${courseId}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Gagal menghapus mata kuliah");
        return await res.json();
    } catch (error) {
        console.error("Error deleting course:", error);
        throw error;
    }
}

// Fungsi untuk mendapatkan detail mata kuliah
export async function getCourseDetail(courseId) {
    try {
        const res = await fetch(`${API_URL}/detail/${courseId}`);
        if (!res.ok) throw new Error("Gagal mengambil detail mata kuliah");
        return await res.json();
    } catch (error) {
        console.error("Error fetching course detail:", error);
        throw error;
    }
}