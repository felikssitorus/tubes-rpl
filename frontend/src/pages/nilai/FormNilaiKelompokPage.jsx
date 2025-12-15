import { createSignal } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import Header from "../../components/layout/Header";

export default function FormNilaiKelompokPage() {
  const params = useParams();
  const navigate = useNavigate();

  const idTubes = params.idTubes;
  const idKelompok = params.idKelompok;

  const [nilai, setNilai] = createSignal("");
  const [catatan, setCatatan] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id_tubes: idTubes,
      id_kelompok: idKelompok,
      nilai: nilai(),
      catatan: catatan(),
    };

    console.log("Submit nilai:", payload);

    // nanti di sini:
    // await submitNilaiKelompok(payload)

    alert("Nilai berhasil disimpan (dummy)");
    navigate(`/dosen/tubes/${idTubes}/nilai`);
  };

  return (
    <>
      <Header />

      <div class="p-6 max-w-xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">
          Form Penilaian Kelompok
        </h1>

        <div class="mb-4 text-sm text-gray-600">
          <p>ID Tubes: {idTubes}</p>
          <p>ID Kelompok: {idKelompok}</p>
        </div>

        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Nilai
            </label>
            <input
              type="number"
              min="0"
              max="100"
              class="w-full border rounded px-3 py-2"
              value={nilai()}
              onInput={(e) => setNilai(e.target.value)}
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Catatan
            </label>
            <textarea
              class="w-full border rounded px-3 py-2"
              rows="4"
              value={catatan()}
              onInput={(e) => setCatatan(e.target.value)}
            />
          </div>

          <div class="flex gap-2">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan Nilai
            </button>

            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() =>
                navigate(`/dosen/tubes/${idTubes}/nilai`)
              }
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
