import { createSignal, Show } from "solid-js";

export default function RubrikModal(props) {
  const [komponenPenilaian, setKomponenPenilaian] = createSignal("");
  const [catatan, setCatatan] = createSignal("");
  const [persentase, setPersentase] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!komponenPenilaian() || !persentase()) {
      alert("Komponen Penilaian dan Persentase harus diisi!");
      return;
    }

    const payload = {
      komponen_penilaian: komponenPenilaian(),
      catatan: catatan(),
      persentase: parseInt(persentase())
    };

    props.onSave(payload);
    
    // Reset form
    setKomponenPenilaian("");
    setCatatan("");
    setPersentase("");
  };

  const handleClose = () => {
    setKomponenPenilaian("");
    setCatatan("");
    setPersentase("");
    props.onClose();
  };

  return (
    <Show when={props.open}>
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
          <div class="p-6">
            <h2 class="text-xl font-bold text-[#465EBE] mb-4">Tambah Rubrik</h2>
            
            <form onSubmit={handleSubmit} class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Komponen Penilaian <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={komponenPenilaian()}
                  onInput={(e) => setKomponenPenilaian(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  placeholder="Masukkan komponen penilaian"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Catatan
                </label>
                <textarea
                  value={catatan()}
                  onInput={(e) => setCatatan(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  placeholder="Masukkan catatan"
                  rows="3"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Persentase (%) <span class="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={persentase()}
                  onInput={(e) => setPersentase(e.target.value)}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE]"
                  placeholder="Masukkan persentase (1-100)"
                  min="1"
                  max="100"
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
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Show>
  );
}