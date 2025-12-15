import { createSignal, onMount, Show, For } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import Header from "../../components/layout/Header";
import { getAllKelompokByTubes } from "../../services/kelompokDosenService";

export default function NilaiDosenPage() {
  const params = useParams();
  const idTubes = params.idTubes;

  const navigate = useNavigate(); // ✅ tambahan

  const [kelompokList, setKelompokList] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const data = await getAllKelompokByTubes(idTubes);
      setKelompokList(data);
    } catch (err) {
      console.error("Gagal mengambil kelompok:", err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <Header />

      <div class="p-6 max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Penilaian Tugas Besar</h1>

        <Show when={!loading()} fallback={<p>Loading data...</p>}>
          <Show
            when={kelompokList().length > 0}
            fallback={<p class="text-gray-500 italic">Belum ada kelompok.</p>}
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <For each={kelompokList()}>
                {(kelompok) => (
                  <div class="border rounded-xl p-4 shadow-sm bg-white">
                    <h2 class="text-lg font-semibold mb-2">
                      {kelompok.nama_kelompok}
                    </h2>

                    <p class="text-sm text-gray-600">
                      ID Kelompok: {kelompok.id_kelompok}
                    </p>

                    <p class="text-sm text-gray-600">
                      Jumlah Anggota: {kelompok.jumlah_anggota ?? "-"}
                    </p>

                    <button
                      class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() =>
                        navigate(
                          `/dosen/tubes/${idTubes}/nilai/${kelompok.id_kelompok}`
                        )
                      }
                    >
                      Beri Nilai
                    </button>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </div>
    </>
  );
}
