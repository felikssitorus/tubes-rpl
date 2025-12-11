import Header from "../../components/layout/Header";
import Nilai from "../../components/nilai/nilai";
import { useParams } from "@solidjs/router";
import { createSignal, onMount, For, Show } from "solid-js";
import axios from "axios";

export default function NilaiPage() {
  const { npm } = useParams();

  const [tubesList, setTubesList] = createSignal([]);
  const [selectedTubes, setSelectedTubes] = createSignal("");

  // Load daftar tubes berdasarkan npm
  onMount(async () => {
    const res = await axios.get(`http://localhost:5000/nilai-mhs/tubes/${npm}`);
    if (res.data) {
      setTubesList(res.data);
    }
  });

  return (
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Dropdown di kiri atas */}
      <div class="p-4">
        <select
          class="w-80 p-2 border border-black rounded"
          value={selectedTubes()}
          onChange={(e) => setSelectedTubes(e.target.value)}
        >
          <option value="" disabled>Pilih Tugas Besar</option>
          <For each={tubesList()}>
            {(tb) => (
              <option value={tb.id_tubes}>{tb.topik_tubes}</option>
            )}
          </For>
        </select>
      </div>

      {/* Container tengah untuk judul + tabel nilai */}
      <div class="flex-1 flex items-center justify-center">
        <Show when={selectedTubes()}>
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-3xl font-bold mb-6 text-[#071755] text-center">
              Detail Nilai
            </h1>
            <Nilai npm={npm} idTubes={selectedTubes()} />
          </div>
        </Show>
      </div>
    </div>
  );
}
