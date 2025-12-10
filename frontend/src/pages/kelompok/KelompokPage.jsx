import { createResource, createSignal, Show, createEffect, For } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import { getKelompokByTubes, generateKelompok, getKelompokById } from "../../services/kelompokService";
import KelompokList from "../../components/kelompok/KelompokList";
import KelompokModal from "../../components/kelompok/KelompokModal";
import Header from "../../components/layout/Header";

export default function KelompokPage() {
  const params = useParams();
  const navigate = useNavigate();
  const idTubes = () => parseInt(params.id_tubes || 1);
  
  const [data, { refetch }] = createResource(() => getKelompokByTubes(idTubes()));
  const [open, setOpen] = createSignal(false);
  const [isLocked, setIsLocked] = createSignal(false);
  const [selectedKelompok, setSelectedKelompok] = createSignal(null);
  const [detailedData, setDetailedData] = createSignal([]);

  // Load detailed data setiap kali data berubah
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
    if (data() && data().length > 0) {
      if (!confirm("Kelompok sudah ada. Membuat kelompok baru akan menghapus kelompok lama. Lanjutkan?")) {
        return;
      }
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

  const handleLock = () => {
    if (!isLocked()) {
      if (confirm("Setelah dikunci, mahasiswa tidak dapat berpindah kelompok. Lanjutkan?")) {
        setIsLocked(true);
        toast.success("Kelompok berhasil dikunci!", {
          style: { background: '#465EBE', color: 'white' }
        });
      }
    } else {
      toast.error("Kelompok sudah dikunci!");
    }
  };

  const handleDosenAssign = () => {
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

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
        
        <Toaster position="top-center" gutter={8} />

        <Header />

        <main class="max-w-5xl mx-auto px-4 pt-6 pb-20">
            <div class="flex flex-col gap-4 mb-6">
                <div>
                   <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mata Kuliah</h2>
                   <h1 class="text-2xl font-bold text-[#465EBE]">Pembagian Kelompok Tugas Besar</h1>
                </div>

                <div class="flex gap-3">
                    <button 
                        onClick={handleKelola}
                        class="flex-1 bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                        </svg>
                        Kelola Kelompok
                    </button>

                    <Show when={data() && data().length > 0}>
                        <button 
                            onClick={handleDosenAssign}
                            class="flex-1 bg-white hover:bg-gray-50 text-[#465EBE] border-2 border-[#465EBE] px-4 py-3 rounded-xl shadow-lg flex justify-center items-center transition-all transform active:scale-95 font-medium"
                        >
                            Dosen Assign
                        </button>
                    </Show>
                </div>
            </div>

            <KelompokList 
                data={detailedData()} 
                isLocked={isLocked()}
                onViewDetail={handleViewDetail}
            />

            <Show when={data() && data().length > 0}>
                <div class="mt-6 flex justify-center">
                    <button 
                        onClick={handleLock}
                        class={`px-8 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 font-medium ${
                            isLocked() 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-amber-500 hover:bg-amber-600 text-white'
                        }`}
                        disabled={isLocked()}
                    >
                        {isLocked() ? 'Locked' : 'Lock'}
                    </button>
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