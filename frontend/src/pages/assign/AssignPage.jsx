import { createResource, createSignal, Show, For } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import { getMahasiswaAvailable, assignMahasiswa } from "../../services/assignMahasiswaService";
import { getKelompokByTubes } from "../../services/kelompokService";
import Header from "../../components/layout/Header";

export default function AssignPage() {
  const params = useParams();
  const navigate = useNavigate();
  const idTubes = () => parseInt(params.id_tubes || 1);
  const kelas = "A";
  
  const [mahasiswaData, { refetch: refetchMahasiswa }] = createResource(
    () => getMahasiswaAvailable(idTubes(), kelas)
  );
  const [kelompokData, { refetch: refetchKelompok }] = createResource(() => getKelompokByTubes(idTubes()));
  
  const [selectedKelompok, setSelectedKelompok] = createSignal(null);
  const [selectedMahasiswa, setSelectedMahasiswa] = createSignal([]);
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const handleSelectKelompok = (kelompok) => {
    setSelectedKelompok(kelompok);
    setSelectedMahasiswa([]);
  };

  const handleToggleMahasiswa = (npm) => {
    const current = selectedMahasiswa();
    const kelompok = selectedKelompok();
    
    if (!kelompok) return;
    
    const maxAnggota = parseInt(kelompok.max_anggota || 4);
    const currentAnggota = parseInt(kelompok.jumlah_anggota || 0);
    
    if (current.includes(npm)) {
      setSelectedMahasiswa(current.filter(m => m !== npm));
    } else {
      const totalSetelahDitambah = currentAnggota + current.length + 1;
      
      if (totalSetelahDitambah > maxAnggota) {
        toast.error(`Kelompok ini maksimal ${maxAnggota} anggota!`);
        return;
      }
      setSelectedMahasiswa([...current, npm]);
    }
  };

  const handleKonfirmasi = async () => {
    if (!selectedKelompok()) {
      toast.error("Pilih kelompok terlebih dahulu!");
      return;
    }

    if (selectedMahasiswa().length === 0) {
      toast.error("Pilih minimal 1 mahasiswa!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const assignments = selectedMahasiswa().map(npm => ({
        npm,
        id_kelompok: selectedKelompok().id_kelompok
      }));

      await assignMahasiswa(assignments);
      
      toast.success(`${assignments.length} mahasiswa berhasil di-assign ke ${selectedKelompok().nama_kelompok}!`, {
        style: { background: '#465EBE', color: 'white' }
      });
      
      setSelectedKelompok(null);
      setSelectedMahasiswa([]);
      await refetchMahasiswa();
      await refetchKelompok(); 
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal meng-assign mahasiswa. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/kelompok/${idTubes()}`);
  };

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
      <Toaster position="top-center" gutter={8} />
      <Header />

      <main class="max-w-5xl mx-auto px-4 pt-6 pb-20">
        <div class="mb-6">
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mata Kuliah</h2>
          <h1 class="text-2xl font-bold text-[#465EBE]">Pembagian Kelompok Tugas Besar</h1>
        </div>

        <Show when={!mahasiswaData.loading && !kelompokData.loading}>
          <div class="mb-6">
            <div class="bg-white border rounded-lg overflow-hidden">
              <For each={kelompokData() || []}>
                {(kelompok) => (
                  <button
                    onClick={() => handleSelectKelompok(kelompok)}
                    class={`w-full px-6 py-4 text-left flex items-center justify-between border-b last:border-b-0 transition-colors ${
                      selectedKelompok()?.id_kelompok === kelompok.id_kelompok
                        ? 'bg-[#465EBE] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span class="font-medium">
                      {kelompok.nama_kelompok} ({kelompok.jumlah_anggota || 0}/{kelompok.max_anggota || 4} Orang)
                    </span>
                    <Show when={selectedKelompok()?.id_kelompok === kelompok.id_kelompok}>
                      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div class="w-3 h-3 bg-[#465EBE] rounded-full"></div>
                      </div>
                    </Show>
                  </button>
                )}
              </For>
            </div>
          </div>

          <Show when={selectedKelompok()}>
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">Nama Mahasiswa</h3>
              
              <Show when={mahasiswaData() && mahasiswaData().length > 0}>
                <div class="bg-white border rounded-lg">
                  <For each={mahasiswaData() || []}>
                    {(mhs) => (
                      <button
                        onClick={() => handleToggleMahasiswa(mhs.npm)}
                        class="w-full px-6 py-4 text-left flex items-center justify-between border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <div class="flex items-center gap-3">
                          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <div>
                            <p class="font-medium text-gray-800">{mhs.nama}</p>
                            <p class="text-sm text-gray-500">{mhs.npm}</p>
                          </div>
                        </div>
                        <Show when={selectedMahasiswa().includes(mhs.npm)}>
                          <div class="w-6 h-6 bg-[#465EBE] rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
                              <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={!mahasiswaData() || mahasiswaData().length === 0}>
                <div class="text-center py-12 text-gray-400 bg-white border rounded-lg">
                  <p>Semua mahasiswa sudah di-assign ke kelompok.</p>
                </div>
              </Show>
            </div>

            <Show when={selectedMahasiswa().length > 0}>
              <div class="flex justify-end">
                <button
                  onClick={handleKonfirmasi}
                  disabled={isSubmitting()}
                  class={`px-8 py-3 rounded-xl shadow-lg font-medium transition-all transform active:scale-95 ${
                    isSubmitting()
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#465EBE] hover:bg-[#3b4fa8] text-white'
                  }`}
                >
                  {isSubmitting() ? 'Menyimpan...' : 'Konfirm'}
                </button>
              </div>
            </Show>
          </Show>

          <Show when={!selectedKelompok()}>
            <div class="text-center py-12 text-gray-400">
              <p>Pilih kelompok terlebih dahulu untuk assign mahasiswa.</p>
            </div>
          </Show>
        </Show>

        <Show when={mahasiswaData.loading || kelompokData.loading}>
          <div class="text-center py-12 text-gray-400">
            <p>Loading...</p>
          </div>
        </Show>
      </main>
    </div>
  );
}