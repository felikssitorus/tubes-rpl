// src/components/admin/PopUpNewCourse.jsx
import { Show } from "solid-js";

const PopUpNewCourse = (props) => {
    const { showModal, setShowModal, formData, handleInputChange, handleSubmit } = props;

    return (
        <Show when={showModal}>
            <div class="fixed inset-0 z-50 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    {/* Overlay */}
                    <div
                        class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal */}
                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="bg-white px-6 pt-6 pb-4">
                            <div class="text-center sm:text-left">
                                <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    Tambah Mata Kuliah Baru
                                </h3>

                                <form onSubmit={handleSubmit}>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                                Nama Mata Kuliah
                                            </label>
                                            <select
                                                name="nama_mata_kuliah"
                                                value={formData.nama_mata_kuliah}
                                                onChange={handleInputChange}
                                                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Pilih Mata Kuliah</option>
                                                <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
                                                <option value="Pemrograman Berbasis Web">Pemrograman Berbasis Web</option>
                                                <option value="Basis Data">Basis Data</option>
                                                <option value="Jaringan Komputer">Jaringan Komputer</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                                Kode Mata Kuliah
                                            </label>
                                            <select
                                                name="kode_mata_kuliah"
                                                value={formData.kode_mata_kuliah}
                                                onChange={handleInputChange}
                                                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value="">Pilih Kode Mata Kuliah</option>
                                                <option value="AIF233101-04">AIF233101-04</option>
                                                <option value="AIF233101-05">AIF233101-05</option>
                                                <option value="AIF233102-01">AIF233102-01</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                                Tahun Ajaran
                                            </label>
                                            <input
                                                type="text"
                                                name="tahun"
                                                value={formData.tahun}
                                                onChange={handleInputChange}
                                                placeholder="Contoh: 2024/2025"
                                                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                                    value={formData.semester}
                                                    onChange={handleInputChange}
                                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="Ganjil">Ganjil</option>
                                                    <option value="Genap">Genap</option>
                                                    <option value="Pendek">Pendek</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                                    Kelas
                                                </label>
                                                <input
                                                    type="text"
                                                    name="kelas"
                                                    value={formData.kelas}
                                                    onChange={handleInputChange}
                                                    placeholder="Contoh: A"
                                                    class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-8 flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            class="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            class="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                                        >
                                            Tambah Mata Kuliah
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
};

export default PopUpNewCourse;