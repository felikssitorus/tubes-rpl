// src/pages/admin/DashboardAdminPage.jsx
import { createSignal } from "solid-js";

const DashboardAdminPage = () => {
    const [showModal, setShowModal] = createSignal(false);
    const [newCourse, setNewCourse] = createSignal({
        nama: "",
        kode: "",
        tahun: "",
        semester: "Ganjil",
        kelas: ""
    });

    // Hardcode data langsung tanpa API call
    const [mataKuliah, setMataKuliah] = createSignal([
        {
            nama_mata_kuliah: "Rekayasa Perangkat Lunak",
            kode_mata_kuliah: "AIF233101-04",
            semester: "Ganjil",
            tahun: "2024/2025",
            kelas: "A",
            dosen: "Dr. Ahmad Rizal, M.Kom.",
        },
        {
            nama_mata_kuliah: "Pemrograman Berbasis Web",
            kode_mata_kuliah: "AIF233102-01",
            semester: "Ganjil",
            tahun: "2024/2025",
            kelas: "B",
            dosen: "Prof. Siti Aminah, Ph.D.",
        },
    ]);

    const handleAddCourse = (e) => {
        e.preventDefault();
        if (!newCourse().nama || !newCourse().kode) {
            alert("Nama dan kode mata kuliah wajib diisi!");
            return;
        }

        const newMk = {
            nama_mata_kuliah: newCourse().nama,
            kode_mata_kuliah: newCourse().kode,
            semester: newCourse().semester,
            tahun: newCourse().tahun || "2024/2025",
            kelas: newCourse().kelas,
            dosen: "Dosen Baru",
        };

        setMataKuliah([...mataKuliah(), newMk]);
        setNewCourse({ nama: "", kode: "", tahun: "", semester: "Ganjil", kelas: "" });
        setShowModal(false);
        alert(`Mata kuliah "${newMk.nama_mata_kuliah}" berhasil ditambahkan!`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div class="min-h-screen bg-gray-100 p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p class="text-gray-600 mb-6">Kelola mata kuliah dan kelompok mahasiswa</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mataKuliah().map((mk) => (
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="h-24 bg-gradient-to-r from-blue-800 to-blue-600 p-4 text-white">
                            <div class="text-sm opacity-90">{mk.kode_mata_kuliah}</div>
                            <div class="text-xl font-bold truncate">{mk.nama_mata_kuliah}</div>
                        </div>
                        <div class="p-4">
                            <p class="text-gray-600 mb-1">📅 Tahun: {mk.tahun}</p>
                            <p class="text-gray-600 mb-1">🎓 Semester: {mk.semester}</p>
                            <p class="text-gray-600 mb-3">👥 Kelas: {mk.kelas}</p>
                            <div class="flex gap-2">
                                <button class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Kelola
                                </button>
                                <button class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                    Lihat
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Button tambah baru - BISA DIKLIK! */}
                <button
                    onClick={() => setShowModal(true)}
                    class="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
                >
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <span class="text-3xl text-blue-600">+</span>
                    </div>
                    <p class="text-lg font-semibold text-gray-700">Tambah Mata Kuliah Baru</p>
                    <p class="text-sm text-gray-500 mt-1">Klik untuk menambah</p>
                </button>
            </div>

            {/* MODAL - Tampil ketika showModal true */}
            {showModal() && (
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-2xl font-bold text-gray-900">Tambah Mata Kuliah Baru</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    class="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleAddCourse}>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Mata Kuliah
                                        </label>
                                        <input
                                            type="text"
                                            name="nama"
                                            value={newCourse().nama}
                                            onChange={handleInputChange}
                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Contoh: Rekayasa Perangkat Lunak"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Kode Mata Kuliah
                                        </label>
                                        <input
                                            type="text"
                                            name="kode"
                                            value={newCourse().kode}
                                            onChange={handleInputChange}
                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Contoh: AIF233101-04"
                                            required
                                        />
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                                Semester
                                            </label>
                                            <select
                                                name="semester"
                                                value={newCourse().semester}
                                                onChange={handleInputChange}
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="Ganjil">Ganjil</option>
                                                <option value="Genap">Genap</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                                Tahun Ajaran
                                            </label>
                                            <input
                                                type="text"
                                                name="tahun"
                                                value={newCourse().tahun}
                                                onChange={handleInputChange}
                                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="2024/2025"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Kelas
                                        </label>
                                        <input
                                            type="text"
                                            name="kelas"
                                            value={newCourse().kelas}
                                            onChange={handleInputChange}
                                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Contoh: A, B, C"
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="flex gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        class="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Semester */}
            <div class="mt-8 bg-white rounded-xl shadow p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Informasi Semester Aktif</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">Tahun Akademik</p>
                        <p class="text-lg font-semibold">2024/2025</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Semester</p>
                        <p class="text-lg font-semibold">Ganjil</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Total Mata Kuliah</p>
                        <p class="text-lg font-semibold">{mataKuliah().length}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status</p>
                        <p class="text-lg font-semibold text-green-600">Aktif</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdminPage;