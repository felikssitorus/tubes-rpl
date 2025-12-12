import { createSignal, Show, For } from "solid-js";
import toast from "solid-toast";

export default function EditKelompokModal(props) {
  const kelompok = () => props.kelompok;
  const [maxAnggota, setMaxAnggota] = createSignal(kelompok()?.max_anggota || 4);
  const [removingNpm, setRemovingNpm] = createSignal(null);

  const handleUpdateMaxAnggota = async () => {
    try {
      await props.onUpdateMaxAnggota(kelompok().id_kelompok, parseInt(maxAnggota()));
      toast.success("Jumlah maksimal anggota berhasil diubah!", {
        style: { background: '#465EBE', color: 'white' }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mengubah jumlah maksimal anggota");
    }
  };

  const handleRemoveAnggota = async (npm, nama) => {
    if (!confirm(`Keluarkan ${nama} dari kelompok ini?`)) {
      return;
    }

    setRemovingNpm(npm);
    try {
      await props.onRemoveAnggota(npm, kelompok().id_kelompok);
      toast.success(`${nama} berhasil dikeluarkan dari kelompok`, {
        style: { background: '#465EBE', color: 'white' }
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal mengeluarkan anggota");
    } finally {
      setRemovingNpm(null);
    }
  };

  return (
    <Show when={props.open && kelompok()}>
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => props.onClose()}
      >
        <div 
          class="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="p-6">\
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-[#465EBE]">
                Edit {kelompok().nama_kelompok}
              </h2>
              <button
                onClick={() => props.onClose()}
                class="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah Maksimal Anggota</label>
              <div class="flex gap-2">
                <input
                  type="number"
                  value={maxAnggota()}
                  onInput={(e) => setMaxAnggota(e.target.value)}
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  min="1"
                />
                <button
                  onClick={handleUpdateMaxAnggota}
                  class="px-4 py-2 bg-[#465EBE] text-white rounded-lg hover:bg-[#3b4fa8] transition-colors"
                >Update</button>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-700 mb-3">
                Anggota Kelompok ({kelompok().anggota?.length || 0})
              </h3>

              <Show when={kelompok().anggota && kelompok().anggota.length > 0}>
                <div class="space-y-2">
                  <For each={kelompok().anggota}>
                    {(anggota) => (
                      <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 bg-[#465EBE] text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {anggota.nama.charAt(0)}
                          </div>
                          <div>
                            <p class="font-medium text-gray-800">{anggota.nama}</p>
                            <p class="text-sm text-gray-500">{anggota.npm}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAnggota(anggota.npm, anggota.nama)}
                          disabled={removingNpm() === anggota.npm}
                          class={`p-2 rounded-lg transition-colors ${
                            removingNpm() === anggota.npm
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'text-red-500 hover:bg-red-50'
                          }`}
                          title="Keluarkan dari kelompok"
                        >delete
                        </button>
                      </div>
                    )}
                  </For>
                </div>
              </Show>

              <Show when={!kelompok().anggota || kelompok().anggota.length === 0}>
                <div class="text-center py-8 text-gray-400 border rounded-lg">
                  <p>Belum ada anggota</p>
                </div>
              </Show>
            </div>

            <div class="mt-6 pt-4 border-t">
              <button
                onClick={() => props.onClose()}
                class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}