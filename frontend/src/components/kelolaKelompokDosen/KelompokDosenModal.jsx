import { createSignal, Show } from "solid-js";

export default function KelompokDosenModal(props) {
  const [jumlahKelompok, setJumlahKelompok] = createSignal("");
  const [jumlahAnggota, setJumlahAnggota] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!jumlahKelompok() || !jumlahAnggota()) {
      alert("Semua field harus diisi!");
      return;
    }

    const payload = {
      id_tubes: props.idTubes,
      jumlah_kelompok: parseInt(jumlahKelompok()),
      jumlah_anggota_per_kelompok: parseInt(jumlahAnggota())
    };

    props.onSave(payload);
    setJumlahKelompok("");
    setJumlahAnggota("");
  };

  const handleClose = () => {
    setJumlahKelompok("");
    setJumlahAnggota("");
    props.onClose();
  };

  return (
    <Show when={props.open}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
          <div class="p-6">
            <h2 class="text-xl font-bold text-[#465EBE] mb-4">Kelola Kelompok</h2>
            
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Kelompok</label>
                <input
                  type="number"
                  value={jumlahKelompok()}
                  onInput={(e) => setJumlahKelompok(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  placeholder="Contoh: 4"
                  min="1"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah Anggota per Kelompok 
                </label>
                <input
                  type="number"
                  value={jumlahAnggota()}
                  onInput={(e) => setJumlahAnggota(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  placeholder="Contoh: 4"
                  min="1"
                  required
                />
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-2 bg-[#465EBE] text-white rounded-lg hover:bg-[#3b4fa8] transition-colors"
                >Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Show>
  );
}