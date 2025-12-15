import { For, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import PopUpNewCourse from "./PopUpNewCourse";

const DashboardAdmin = (props) => {
    const { mataKuliah } = props;
    const navigate = useNavigate();

    // State untuk modal
    const [showModal, setShowModal] = createSignal(false);
    const [formData, setFormData] = createSignal({
        nama_mata_kuliah: "",
        kode_mata_kuliah: "",
        tahun: "",
        semester: "Ganjil",
        kelas: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData());
        alert(`Mata kuliah ${formData().nama_mata_kuliah} berhasil ditambahkan!`);
        setShowModal(false);
        setFormData({
            nama_mata_kuliah: "",
            kode_mata_kuliah: "",
            tahun: "",
            semester: "Ganjil",
            kelas: ""
        });
    };

    const handleManageCourse = (mk) => {
        navigate(`/admin/kelola-kelompok/${encodeURIComponent(mk.nama_mata_kuliah)}`);
    };

    const handleViewDetails = (mk) => {
        navigate(`/admin/detail/${encodeURIComponent(mk.nama_mata_kuliah)}`);
    };

    return (
        <div class="p-1">
            {/* Grid Kartu Mata Kuliah */}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={mataKuliah}>
                    {(mk) => (
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            {/* Card Header */}
                            <div
                                class="h-32 p-6 text-white"
                                style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);"
                            >
                                <div class="text-sm opacity-90 mb-1">{mk.kode_mata_kuliah}</div>
                                <div class="text-xl font-bold line-clamp-2">{mk.nama_mata_kuliah}</div>
                            </div>

                            {/* Card Body */}
                            <div class="p-6">
                                <div class="space-y-3 mb-6">
                                    <div class="flex items-center text-gray-600">
                                        <svg class="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                        </svg>
                                        <span>Tahun: {mk.tahun}</span>
                                    </div>
                                    <div class="flex items-center text-gray-600">
                                        <svg class="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                        <span>Semester: {mk.semester}</span>
                                    </div>
                                    <div class="flex items-center text-gray-600">
                                        <svg class="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                        <span>Kelas: {mk.kelas}</span>
                                    </div>
                                    <Show when={mk.jumlah_mahasiswa}>
                                        <div class="flex items-center text-gray-600">
                                            <svg class="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            <span>Mahasiswa: {mk.jumlah_mahasiswa}</span>
                                        </div>
                                    </Show>
                                </div>

                                {/* Action Buttons */}
                                <div class="flex space-x-3">
                                    <button
                                        onClick={() => handleManageCourse(mk)}
                                        class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                                    >
                                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Kelola
                                    </button>
                                    <button
                                        onClick={() => handleViewDetails(mk)}
                                        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                                    >
                                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                        </svg>
                                        Lihat
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </For>

                {/* Card Tambah Mata Kuliah Baru */}
                <button
                    onClick={() => setShowModal(true)}
                    class="bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg"
                >
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div class="text-lg font-semibold text-gray-700">Tambah Mata Kuliah Baru</div>
                    <div class="text-sm text-gray-500 mt-1">Klik untuk menambah mata kuliah baru</div>
                </button>
            </div>

            {/* Gunakan PopUpNewCourse component */}
            <PopUpNewCourse
                showModal={showModal()}
                setShowModal={setShowModal}
                formData={formData()}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

            {/* Semester Info */}
            <div class="mt-8 bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Informasi Semester Aktif</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <p class="text-sm text-gray-500">Tahun Akademik</p>
                        <p class="text-lg font-semibold text-gray-900">2024/2025</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Semester</p>
                        <p class="text-lg font-semibold text-gray-900">Ganjil</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Total Mata Kuliah</p>
                        <p class="text-lg font-semibold text-gray-900">{mataKuliah?.length || 0}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Status Sistem</p>
                        <p class="text-lg font-semibold text-green-600">Aktif</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;