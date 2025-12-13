// src/components/admin/PopupNewCourse.jsx
import { createSignal } from "solid-js";

const PopupNewCourse = (props) => {
    const [form, setForm] = createSignal({
        nama_mata_kuliah: "",
        kode_mata_kuliah: "",
        tahun_ajaran: "2024", 
        semester: "",
        kelas: "A"
    });

    const [errors, setErrors] = createSignal({});
    const [isSubmitting, setIsSubmitting] = createSignal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form(), [name]: value });

        // Clear error saat user mengetik
        if (errors()[name]) {
            setErrors({ ...errors(), [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form().nama_mata_kuliah.trim()) {
            newErrors.nama_mata_kuliah = "Nama mata kuliah wajib diisi";
        }

        if (!form().kode_mata_kuliah.trim()) {
            newErrors.kode_mata_kuliah = "Kode mata kuliah wajib diisi";
        } else if (!/^[A-Z0-9]{3,10}$/.test(form().kode_mata_kuliah)) {
            newErrors.kode_mata_kuliah = "Kode harus 3-10 karakter huruf/angka";
        }

        
        if (!form().tahun_ajaran.trim()) {
            newErrors.tahun_ajaran = "Tahun ajaran wajib diisi";
        } else if (!/^\d{4}$/.test(form().tahun_ajaran)) {
            newErrors.tahun_ajaran = "Format: 4 digit angka (contoh: 2024)";
        } else if (parseInt(form().tahun_ajaran) < 2000 || parseInt(form().tahun_ajaran) > 2100) {
            newErrors.tahun_ajaran = "Tahun harus antara 2000-2100";
        }

        if (!form().semester) {
            newErrors.semester = "Pilih semester";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Data yang akan dikirim ke backend
            const formData = {
                ...form(),
                //  display untuk UI
                tahun_ajaran_display: `${form().tahun_ajaran}/${parseInt(form().tahun_ajaran) + 1}`
            };

            console.log("📤 Data form:", formData);
            await props.onConfirm(formData);
        } catch (error) {
            console.error("Submit error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Hitung tahun berikutnya untuk display
    const getDisplayTahun = () => {
        const tahun = parseInt(form().tahun_ajaran) || 2024;
        return `${tahun}/${tahun + 1}`;
    };

    return (
        <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-2xl font-bold text-white">New Course</h2>
                            <p class="text-blue-100 text-sm mt-1">Tambahkan mata kuliah baru</p>
                        </div>
                        <button
                            onClick={() => !isSubmitting() && props.onClose()}
                            class="text-white hover:text-blue-200 text-2xl transition disabled:opacity-50"
                            disabled={isSubmitting()}
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} class="p-6 space-y-5">
                    <div>
                        <label class="block text-gray-700 mb-2 font-medium">
                            Nama Mata Kuliah *
                        </label>
                        <input
                            type="text"
                            name="nama_mata_kuliah"
                            value={form().nama_mata_kuliah}
                            onInput={handleChange}
                            class="w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            classList={{
                                "border-gray-300": !errors().nama_mata_kuliah,
                                "border-red-500": errors().nama_mata_kuliah
                            }}
                            placeholder="Rekayasa Perangkat Lunak"
                            disabled={isSubmitting()}
                        />
                        {errors().nama_mata_kuliah && (
                            <p class="text-red-500 text-sm mt-1">{errors().nama_mata_kuliah}</p>
                        )}
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">
                                Kode Mata Kuliah *
                            </label>
                            <input
                                type="text"
                                name="kode_mata_kuliah"
                                value={form().kode_mata_kuliah}
                                onInput={handleChange}
                                class="w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition uppercase"
                                classList={{
                                    "border-gray-300": !errors().kode_mata_kuliah,
                                    "border-red-500": errors().kode_mata_kuliah
                                }}
                                placeholder="RPL001"
                                disabled={isSubmitting()}
                            />
                            {errors().kode_mata_kuliah && (
                                <p class="text-red-500 text-sm mt-1">{errors().kode_mata_kuliah}</p>
                            )}
                        </div>

                        {/* ⭐ GANTI INPUT TAHUN AJARAN */}
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">
                                Tahun Ajaran *
                            </label>
                            <div class="relative">
                                <input
                                    type="number"
                                    name="tahun_ajaran"
                                    value={form().tahun_ajaran}
                                    onInput={handleChange}
                                    class="w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    classList={{
                                        "border-gray-300": !errors().tahun_ajaran,
                                        "border-red-500": errors().tahun_ajaran
                                    }}
                                    placeholder="2024"
                                    min="2000"
                                    max="2100"
                                    disabled={isSubmitting()}
                                />
                                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded">
                                    → {getDisplayTahun()}
                                </div>
                            </div>
                            <div class="mt-2 flex justify-between text-xs">
                                <span class="text-gray-500">
                                    Backend: <code class="bg-gray-100 px-1 py-0.5 rounded">{form().tahun_ajaran || "2024"}</code>
                                </span>
                                <span class="text-blue-600">
                                    Display: <code class="bg-blue-50 px-1 py-0.5 rounded">{getDisplayTahun()}</code>
                                </span>
                            </div>
                            {errors().tahun_ajaran && (
                                <p class="text-red-500 text-sm mt-1">{errors().tahun_ajaran}</p>
                            )}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">
                                Semester *
                            </label>
                            <select
                                name="semester"
                                value={form().semester}
                                onChange={handleChange}
                                class="w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                classList={{
                                    "border-gray-300": !errors().semester,
                                    "border-red-500": errors().semester
                                }}
                                disabled={isSubmitting()}
                            >
                                <option value="">Pilih Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                                <option value="7">Semester 7</option>
                                <option value="8">Semester 8</option>
                            </select>
                            {errors().semester && (
                                <p class="text-red-500 text-sm mt-1">{errors().semester}</p>
                            )}
                        </div>

                        <div>
                            <label class="block text-gray-700 mb-2 font-medium">
                                Kelas
                            </label>
                            <select
                                name="kelas"
                                value={form().kelas}
                                onChange={handleChange}
                                class="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                disabled={isSubmitting()}
                            >
                                <option value="A">Kelas A</option>
                                <option value="B">Kelas B</option>
                                <option value="C">Kelas C</option>
                                <option value="D">Kelas D</option>
                                <option value="E">Kelas E</option>
                                <option value="F">Kelas F</option>
                            </select>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div class="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div class="flex items-start gap-3">
                            <div class="text-blue-600 mt-0.5">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="text-sm">
                                <p class="font-medium text-blue-800">Info Format Data</p>
                                <p class="text-blue-600 mt-1">
                                    • Backend menerima <strong>tahun sebagai angka</strong> (contoh: 2024)
                                </p>
                                <p class="text-blue-600">
                                    • UI menampilkan sebagai <strong>2024/2025</strong>
                                </p>
                                <p class="text-blue-600 text-xs mt-2">
                                    Database menyimpan: <code class="bg-blue-100 px-1 py-0.5 rounded">tahun_ajaran = 2024</code>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => props.onClose()}
                            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition disabled:opacity-50"
                            disabled={isSubmitting()}
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            disabled={isSubmitting()}
                        >
                            {isSubmitting() ? (
                                <>
                                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Confirmasi</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupNewCourse;