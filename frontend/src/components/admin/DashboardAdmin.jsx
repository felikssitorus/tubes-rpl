// src/components/admin/DashboardAdmin.jsx
import { For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

const DashboardAdmin = (props) => {
    const { mataKuliah = [], onAddCourse } = props;
    const navigate = useNavigate();

    return (
        <div class="p-4 md:p-6">
            {/* Header dengan tombol New Course */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Daftar Mata Kuliah</h1>
                    <p class="text-gray-600 mt-1">Kelola mata kuliah yang tersedia untuk semester ini</p>
                </div>

                <button
                    onClick={onAddCourse}
                    class="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Course</span>
                </button>
            </div>

            {/* Grid Kartu Mata Kuliah */}
            <Show
                when={mataKuliah.length > 0}
                fallback={
                    <div class="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum ada mata kuliah</h3>
                        <p class="text-gray-500 max-w-md mx-auto mb-6">
                            Tambahkan mata kuliah baru untuk memulai pengelolaan kelas
                        </p>
                        <button
                            onClick={onAddCourse}
                            class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                        >
                            + Tambah Mata Kuliah Pertama
                        </button>
                    </div>
                }
            >
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <For each={mataKuliah}>
                        {(mk) => (
                            <div
                                class="class-card group flex flex-col h-full min-h-[180px] rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                                style="background: linear-gradient(135deg, #465EBE 0%, #212C58 100%);"
                                onClick={() =>
                                    navigate(`/admin/course/${encodeURIComponent(mk.kode_mata_kuliah)}`)
                                }
                            >
                                {/* Badge Admin */}
                                <div class="self-end m-3">
                                    <span class="bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        ADMIN
                                    </span>
                                </div>

                                {/* Konten Kartu */}
                                <div class="flex-1 flex flex-col items-center justify-center p-5">
                                    <div class="font-bold text-white text-lg text-center mb-2 line-clamp-2 leading-tight">
                                        {mk.nama_mata_kuliah}
                                    </div>
                                    <div class="text-blue-200 text-sm font-medium text-center mb-1">
                                        {mk.kode_mata_kuliah}
                                    </div>
                                    <div class="text-blue-100 text-xs text-center opacity-80">
                                        {mk.sks || 3} SKS
                                    </div>
                                </div>

                                {/* Footer Kartu */}
                                <div class="bg-black bg-opacity-20 p-4 text-white">
                                    <div class="flex justify-between items-center text-sm">
                                        <div class="flex items-center gap-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Sem {mk.semester}</span>
                                        </div>

                                        <div class="flex items-center gap-1">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <span>Kelas {mk.kelas}</span>
                                        </div>
                                    </div>

                                    <div class="text-center mt-2 text-blue-100 text-xs font-medium">
                                        {mk.tahun_ajaran}
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </Show>

            {/* Informasi Semester (Mirip Mahasiswa) */}
            <div class="mt-10 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    <h2 class="text-xl font-bold text-gray-800">Informasi Semester</h2>
                </div>

                <div class="space-y-4">
                    <Show
                        when={mataKuliah.length > 0}
                        fallback={
                            <div class="text-center py-8 text-gray-500">
                                <p>Belum ada mata kuliah untuk ditampilkan</p>
                            </div>
                        }
                    >
                        <For each={mataKuliah}>
                            {(mk, index) => (
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                                    <div class="mb-3 sm:mb-0">
                                        <div class="flex items-center gap-3">
                                            <span class="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                                                {index() + 1}
                                            </span>
                                            <div>
                                                <h4 class="font-semibold text-gray-800">{mk.nama_mata_kuliah}</h4>
                                                <p class="text-gray-600 text-sm">
                                                    {mk.kode_mata_kuliah} • {mk.sks || 3} SKS
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="text-gray-700 text-sm sm:text-right">
                                        <div>Semester {mk.semester}</div>
                                        <div>{mk.tahun_ajaran}, Kelas {mk.kelas}</div>
                                    </div>
                                </div>
                            )}
                        </For>
                    </Show>
                </div>

                {/* Summary */}
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <div class="flex flex-wrap gap-4">
                        <div class="px-4 py-2 bg-blue-50 rounded-lg">
                            <div class="text-sm text-gray-600">Total Mata Kuliah</div>
                            <div class="text-xl font-bold text-blue-700">{mataKuliah.length}</div>
                        </div>

                        <div class="px-4 py-2 bg-green-50 rounded-lg">
                            <div class="text-sm text-gray-600">Semester Aktif</div>
                            <div class="text-xl font-bold text-green-700">
                                {mataKuliah.length > 0 ? mataKuliah[0].semester : "-"}
                            </div>
                        </div>

                        <div class="px-4 py-2 bg-purple-50 rounded-lg">
                            <div class="text-sm text-gray-600">Tahun Ajaran</div>
                            <div class="text-xl font-bold text-purple-700">
                                {mataKuliah.length > 0 ? mataKuliah[0].tahun_ajaran : "2024/2025"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;