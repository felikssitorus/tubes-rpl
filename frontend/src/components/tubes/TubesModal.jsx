import { createSignal, createEffect } from "solid-js";

export default function TubesModal(props) {
  const { open, data, onClose, onSave } = props;

  const [topikTubes, setTopikTubes] = createSignal("");

  createEffect(() => {
    if (props.open) {
      if (props.data) {
        // Mode edit
        setTopikTubes(props.data.topik_tubes || "");
      } else {
        // Mode tambah
        setTopikTubes("");
      }
    }
  });

  const handleSubmit = () => {
    onSave({
      topik_tubes: topikTubes(),
    });
  };

  if (!open) return null;

  return (
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity">
      <div class="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all scale-100">
        
        <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          {data ? "Edit Tubes" : "Tambah Tubes"}
        </h2>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Topik Tubes</label>
          <input
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            value={topikTubes()}
            onInput={(e) => setTopikTubes(e.target.value)}
            placeholder="Contoh: Sistem Informasi Perpustakaan"
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <button 
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            class="px-4 py-2 bg-[#465EBE] hover:bg-[#3b4fa8] text-white rounded-lg font-medium shadow-md transition" 
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}