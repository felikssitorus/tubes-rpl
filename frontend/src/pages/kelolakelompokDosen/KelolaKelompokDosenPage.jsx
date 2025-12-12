import { createResource, createSignal, Show, createEffect, For } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import { 
  getAllKelompokByTubes,
  generateKelompok, 
  getKelompokById,
  updateMaxAnggota,
  removeAnggota,
  getLockStatus,
  lockTubes
} from "../../services/kelompokDosenService";
import KelompokList from "../../components/kelolaKelompokDosen/KelompokDosenList";
import KelompokModal from "../../components/kelolaKelompokDosen/KelompokDosenModal";
import EditKelompokModal from "../../components/kelolaKelompokDosen/EditKelompokModal";
import { getTubes } from "../../services/TubesService";
import Header from "../../components/layout/Header";

export default function KelolaKelompokDosenPage() {
  const params = useParams();
  const navigate = useNavigate();
  const idTubes = () => parseInt(params.id_tubes || 1);
  
  const [tubes] = createResource(() => getTubes(idTubes()));
  
  const [data, { refetch }] = createResource(() => getAllKelompokByTubes(idTubes()));
  const [lockStatusData, { refetch: refetchLockStatus }] = createResource(() => getLockStatus(idTubes()));
  
  const [open, setOpen] = createSignal(false);
  const [selectedKelompok, setSelectedKelompok] = createSignal(null);
  const [editKelompok, setEditKelompok] = createSignal(null);
  const [detailedData, setDetailedData] = createSignal([]);

  const isLocked = () => {
    const status = lockStatusData();
    return status?.is_locked === true;
  };

  createEffect(async () => {
    const kelompokList = data();
    
    if (kelompokList && kelompokList.length > 0) {
      try {
        const detailed = await Promise.all(
          kelompokList.map(async (kelompok) => {
            const detail = await getKelompokById(kelompok.id_kelompok);
            return detail;
          })
        );
        setDetailedData(detailed);
      } catch (error) {
        console.error("Error loading detailed data:", error);
        setDetailedData(kelompokList);
      }
    } else {
      setDetailedData([]);
    }
  });

  const handleKelola = () => {
    if (isLocked()) {
      toast.error("Kelompok sudah dikunci! Tidak bisa melakukan perubahan.");
      return;
    }
    setOpen(true);
  };

  const handleSave = async (payload) => {
    try {
      const result = await generateKelompok(payload);
      
      toast.success("Kelompok berhasil dibuat!", {
          style: { background: '#465EBE', color: 'white' }
      });
      
      setOpen(false);
      await refetch();

    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal membuat kelompok. Cek koneksi atau input Anda.");
    }
  };

  const handleLock = async () => {
    if (isLocked()) {
      toast.error("Kelompok sudah dikunci!");
      return;
    }

    if (!confirm("Setelah dikunci, mahasiswa tidak dapat berpindah kelompok dan dosen tidak dapat melakukan perubahan. Lanjutkan?")) {
      return;
    }

    try {
      await lockTubes(idTubes());
      await refetchLockStatus();
      
      toast.success("Kelompok berhasil dikunci!", {
        style: { background: '#465EBE', color: 'white' }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mengunci kelompok");
    }
  };

  const handleDosenAssign = () => {
    if (isLocked()) {
      toast.error("Kelompok sudah dikunci! Tidak bisa melakukan assign.");
      return;
    }
    navigate(`/kelompok/${idTubes()}/assign`);
  };

  const handleViewDetail = async (id_kelompok) => {
    try {
      const detail = await getKelompokById(id_kelompok);
      setSelectedKelompok(detail);
    } catch (error) {
      console.error("Error loading detail:", error);
      toast.error("Gagal memuat detail kelompok");
    }
  };

  const handleEditKelompok = async (id_kelompok) => {
    if (isLocked()) {
      toast.error("Kelompok sudah dikunci! Tidak bisa melakukan edit.");
      return;
    }
    
    try {
      const detail = await getKelompokById(id_kelompok);
      setEditKelompok(detail);
    } catch (error) {
      console.error("Error loading detail:", error);
      toast.error("Gagal memuat detail kelompok");
    }
  };

  const handleUpdateMaxAnggota = async (id_kelompok, max_anggota) => {
    try {
      await updateMaxAnggota(id_kelompok, max_anggota);
      await refetch();
      const updated = await getKelompokById(id_kelompok);
      setEditKelompok(updated);
    } catch (error) {
      throw error;
    }
  };

  const handleRemoveAnggota = async (npm, id_kelompok) => {
    try {
      await removeAnggota(npm, id_kelompok);
      await refetch();
      const updated = await getKelompokById(id_kelompok);
      setEditKelompok(updated);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
        <Toaster position="top-center" gutter={8} />
        <Header />

        <main class="max-w-5xl mx-auto px-4 pt-6 pb-20">
            <div class="flex flex-col gap-4 mb-6">
              <div>
                <div class="mb-8">
                  <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    MATA KULIAH : {tubes()?.nama_mata_kuliah || "Loading..."}
                  </h2>
                </div>
                <h1 class="text-2xl font-bold text-[#465EBE]">Pembagian Kelompok Tugas Besar</h1>
                
                <Show when={isLocked()}>
                  <div class="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Kelompok Terkunci
                  </div>
                </Show>
              </div>

              <Show when={!lockStatusData.loading && !isLocked()}>
                <div class="flex gap-3">
                    <button 
                        onClick={handleKelola}
                        class="flex-1 bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 font-medium"
                    >Kelola Kelompok</button>

                    <Show when={data() && data().length > 0}>
                        <button 
                            onClick={handleDosenAssign}
                            class="flex-1 bg-white hover:bg-gray-50 text-[#465EBE] border-2 border-[#465EBE] px-4 py-3 rounded-xl shadow-lg flex justify-center items-center transition-all transform active:scale-95 font-medium"
                        >Dosen Assign</button>
                    </Show>
                </div>
              </Show>

              <Show when={lockStatusData.loading}>
                <div class="text-center py-4 text-gray-400">
                  <p>Loading...</p>
                </div>
              </Show>
          </div>

            <KelompokList 
                data={detailedData()} 
                isLocked={isLocked()}
                onViewDetail={handleViewDetail}
                onEditKelompok={handleEditKelompok}
            />

            <Show when={data() && data().length > 0 && !lockStatusData.loading && !isLocked()}>
              <div class="mt-6 flex justify-center">
                  <button 
                      onClick={handleLock}
                      class="px-8 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 font-medium bg-amber-500 hover:bg-amber-600 text-white"
                  >Lock</button>
              </div>
          </Show>
            <Show when={selectedKelompok()}>
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedKelompok(null)}>
                    <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 class="text-xl font-bold text-[#465EBE] mb-4">
                            {selectedKelompok().nama_kelompok}
                        </h3>
                        <Show when={selectedKelompok().anggota && selectedKelompok().anggota.length > 0}>
                            <ul class="space-y-2">
                                <For each={selectedKelompok().anggota}>
                                    {(anggota) => (
                                        <li class="flex items-center gap-3 p-2 border rounded-lg">
                                            <div class="w-8 h-8 bg-[#465EBE] text-white rounded-full flex items-center justify-center font-bold">
                                                {anggota.nama.charAt(0)}
                                            </div>
                                            <div>
                                                <p class="font-medium text-gray-800">{anggota.nama}</p>
                                                <p class="text-sm text-gray-500">{anggota.npm}</p>
                                            </div>
                                        </li>
                                    )}
                                </For>
                            </ul>
                        </Show>
                        <Show when={!selectedKelompok().anggota || selectedKelompok().anggota.length === 0}>
                            <p class="text-gray-400 text-center py-4">Belum ada anggota</p>
                        </Show>
                        <button 
                            onClick={() => setSelectedKelompok(null)}
                            class="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </Show>

            <EditKelompokModal
                open={!!editKelompok()}
                kelompok={editKelompok()}
                onClose={() => setEditKelompok(null)}
                onUpdateMaxAnggota={handleUpdateMaxAnggota}
                onRemoveAnggota={handleRemoveAnggota}
            />
        </main>

        <Show when={open()}>
            <KelompokModal
                open={open()}
                idTubes={idTubes()}
                onSave={handleSave}
                onClose={() => setOpen(false)}
            />
        </Show>
    </div>
  );
}