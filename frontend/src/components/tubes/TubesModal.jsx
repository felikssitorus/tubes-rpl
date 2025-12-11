import { createSignal, createEffect } from "solid-js";

export default function TubesModal(props) {
  const { open, data, onClose, onSave } = props;

  const [namaTubes, setNamaTubes] = createSignal("");
  const [tahunAjaran, setTahunAjaran] = createSignal("");
  const [semester, setSemester] = createSignal("");

  createEffect(() => {
    if (props.open) {
      if (props.data) {
        // Mode edit
        setNamaTubes(props.data.nama_tubes || "");
        setTahunAjaran(props.data.tahun_ajaran || "");
        setSemester(props.data.semester || "");
      } else {
        // Mode tambah
        setNamaTubes("");
        setTahunAjaran("");
        setSemester("");
      }
    }
  });

  const handleSubmit = () => {
    onSave({
      nama_tubes: namaTubes(),
      tahun_ajaran: tahunAjaran(),
      semester: semester(),
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Tubes</label>
          <input
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            value={namaTubes()}
            onInput={(e) => setNamaTubes(e.target.value)}
            placeholder="Contoh: Tubes 1"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
          <input
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            value={tahunAjaran()}
            onInput={(e) => setTahunAjaran(e.target.value)}
            placeholder="Contoh: 2025/2026"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            class="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-[#465EBE] focus:border-[#465EBE] outline-none"
            value={semester()}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Pilih Semester</option>
            <option value="Ganjil">Ganjil</option>
            <option value="Genap">Genap</option>
          </select>
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
