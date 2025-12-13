// src/pages/admin/DashboardAdminPage.jsx
import { createResource, Show, createSignal, onMount } from "solid-js";
import DashboardAdmin from "../../components/admin/DashboardAdmin";
import Header from "../../components/layout/Header";
import PopupNewCourse from "../../components/admin/PopUpNewCourse";
import { getAllCourses, createCourse, testBackendConnection } from "../../services/adminService";

const DashboardAdminPage = () => {
    const [showPopup, setShowPopup] = createSignal(false);
    const [reload, setReload] = createSignal(0);
    const [backendStatus, setBackendStatus] = createSignal({
        connected: false,
        message: "Mengecek koneksi...",
        endpoint: ""
    });

    // Test backend connection on mount
    onMount(async () => {
        console.log("🔄 DashboardAdminPage mounted");
        console.log("🌐 Testing backend connection...");

        const result = await testBackendConnection();

        if (result.success) {
            setBackendStatus({
                connected: true,
                message: `✅ Terhubung: ${result.data?.message || "Backend aktif"}`,
                endpoint: result.endpoint
            });
            console.log("Backend info:", result);
        } else {
            setBackendStatus({
                connected: false,
                message: `❌ Error: ${result.error}`,
                endpoint: "http://localhost:5000/api/admin",
                suggestion: result.suggestion
            });
            console.error("Backend error:", result);
        }
    });

    const [coursesData] = createResource(
        () => reload(),
        async () => {
            console.group("📊 Fetching Courses");
            console.log("Timestamp:", new Date().toISOString());

            try {
                const data = await getAllCourses();
                console.log("Data courses:", data);

                // Update status jika menggunakan fallback
                if (data._fallback) {
                    setBackendStatus(prev => ({
                        ...prev,
                        usingFallback: true,
                        fallbackMessage: data._message
                    }));
                }

                console.groupEnd();
                return data;
            } catch (error) {
                console.error("Fetch error:", error);
                console.groupEnd();
                throw error;
            }
        },
        {
            initialValue: { courses: [] },
            deferStream: true
        }
    );

    const handleAddCourse = async (courseData) => {
        console.log("📝 Menambahkan course baru:", courseData);

        // Validasi
        if (!courseData.nama_mata_kuliah || !courseData.kode_mata_kuliah) {
            alert("Nama dan Kode Mata Kuliah wajib diisi!");
            return;
        }

        try {
            const result = await createCourse(courseData);
            console.log("Result:", result);

            // Tampilkan alert sesuai hasil
            if (result.message.includes("localStorage")) {
                alert(`⚠️ "${courseData.nama_mata_kuliah}" ditambahkan (sementara)\n${result.message}`);
            } else {
                alert(`✅ "${courseData.nama_mata_kuliah}" berhasil ditambahkan!`);
            }

            setShowPopup(false);
            setReload(reload() + 1); // Refresh data

        } catch (error) {
            console.error("Error in handleAddCourse:", error);
            alert(`❌ Gagal menambah course: ${error.message}`);
        }
    };

    return (
        <div class="min-h-screen bg-gray-50">
            <Header />

            <div class="container mx-auto px-4 py-8">
                {/* Status Banner dengan informasi lengkap */}
                <div class="mb-6 p-4 rounded-xl shadow-sm border" classList={{
                    "bg-gradient-to-r from-green-50 to-green-100 border-green-200": backendStatus().connected && !backendStatus().usingFallback,
                    "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200": backendStatus().usingFallback,
                    "bg-gradient-to-r from-red-50 to-red-100 border-red-200": !backendStatus().connected && !backendStatus().usingFallback
                }}>
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-3 h-3 rounded-full" classList={{
                                    "bg-green-500": backendStatus().connected && !backendStatus().usingFallback,
                                    "bg-yellow-500": backendStatus().usingFallback,
                                    "bg-red-500": !backendStatus().connected
                                }}></div>
                                <h3 class="font-bold text-gray-800 text-lg">Dashboard Admin</h3>
                            </div>

                            <p class="text-gray-700 mb-1">{backendStatus().message}</p>

                            {backendStatus().suggestion && (
                                <p class="text-sm text-gray-600 italic">{backendStatus().suggestion}</p>
                            )}

                            {backendStatus().fallbackMessage && (
                                <p class="text-sm text-yellow-700 mt-2">
                                    ⚠️ {backendStatus().fallbackMessage}
                                </p>
                            )}

                            <div class="mt-3 flex flex-wrap gap-4 text-sm">
                                <div class="flex items-center gap-2">
                                    <span class="text-gray-500">Endpoint:</span>
                                    <code class="px-2 py-1 bg-gray-100 rounded text-gray-800">
                                        {backendStatus().endpoint || "http://localhost:5000/api/admin"}
                                    </code>
                                </div>

                                <div class="flex items-center gap-2">
                                    <span class="text-gray-500">Data:</span>
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                        {coursesData()?.courses?.length || 0} courses
                                    </span>
                                </div>

                                {coursesData()?._backendPath && (
                                    <div class="flex items-center gap-2">
                                        <span class="text-gray-500">Path:</span>
                                        <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                                            {coursesData()._backendPath}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setReload(reload() + 1)}
                                class="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition shadow-sm border border-gray-300 flex items-center justify-center gap-2"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Data
                            </button>

                            <button
                                onClick={() => window.open("http://localhost:5000/api/admin/test", "_blank")}
                                class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Test Backend
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <DashboardAdmin
                    mataKuliah={coursesData()?.courses || []}
                    onAddCourse={() => setShowPopup(true)}
                />

                {/* New Course Popup */}
                <Show when={showPopup()}>
                    <PopupNewCourse
                        onClose={() => setShowPopup(false)}
                        onConfirm={handleAddCourse}
                    />
                </Show>

                {/* Loading Overlay */}
                <Show when={coursesData.loading}>
                    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div class="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm">
                            <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                            <p class="text-xl font-medium text-gray-800">Memuat Data...</p>
                            <p class="text-gray-600 mt-2">Mengambil data mata kuliah dari backend</p>
                            <div class="mt-4 text-sm text-gray-500">
                                Endpoint: {backendStatus().endpoint || "http://localhost:5000/api/admin"}/mata-kuliah/aktif
                            </div>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
    );
};

export default DashboardAdminPage;