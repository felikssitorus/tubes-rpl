import { createSignal, createEffect } from "solid-js";

export default function KomponenModal(props) {
  const { open, data, onClose, onSave } = props;

  const [nama, setNama] = createSignal("");
  const [bobot, setBobot] = createSignal("");
  const [catatan, setCatatan] = createSignal("");

  createEffect(() => {
    if (props.open) {
      if (props.data) {
        setNama(props.data.nama_komponen || ""); 
        setBobot(props.data.bobot_komponen || "");
        setCatatan(props.data.catatan || "");

      } else {
        setNama("");
        setBobot("");
        setCatatan("");
      }
    }
  });

  const handleSubmit = () => {
    onSave({
      nama_komponen: nama(),
      bobot_komponen: Number(bobot()),
      catatan: catatan(),
      id_tubes: 1 
    });
  };

  if (!open) return null;

  return (
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity">
      <div class="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all scale-100">
        
        <h2 class="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          {data ? "Edit Komponen" : "Tambah Komponen"}
        </h2>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Komponen</label>
          <input
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            value={nama()}
            onInput={(e) => setNama(e.target.value)}
            placeholder="Contoh: Use Case Diagram"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Bobot (%)</label>
          <input
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            type="number"
            value={bobot()}
            onInput={(e) => setBobot(e.target.value)}
            placeholder="0 - 100"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
          <textarea
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none resize-none"
            rows="3"
            value={catatan()}
            onInput={(e) => setCatatan(e.target.value)}
            placeholder="Tambahkan catatan jika perlu..."
          />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition" onClick={onClose}>
            Batal
          </button>
          <button class="px-4 py-2 bg-[#465EBE] hover:bg-[#3b4fa8] text-white rounded-lg font-medium shadow-md transition" onClick={handleSubmit}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}