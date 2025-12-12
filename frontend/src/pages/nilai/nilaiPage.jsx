import { createSignal, onMount, For, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import axios from "axios";
import Header from "../../components/layout/Header";
import Nilai from "../../components/nilai/nilai";

export default function NilaiPage() {
  const { npm, idMk } = useParams();
  const [tubesList, setTubesList] = createSignal([]);
  const [selectedTubes, setSelectedTubes] = createSignal("");

  onMount(async () => {
    if (!npm || !idMk) return console.error("npm atau idMk tidak valid");

    try {
      const res = await axios.get(
        `http://localhost:5000/nilai-mhs/tubes/${encodeURIComponent(
          npm.trim()
        )}?idMk=${idMk}`
      );
      setTubesList(res.data || []);
    } catch (err) {
      console.error("Gagal load tubes:", err);
    }
  });

  return (
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Dropdown Tugas Besar */}
      <div class="p-4">
        <select
          class="w-80 p-2 border border-black rounded"
          value={selectedTubes()}
          onChange={(e) => setSelectedTubes(e.target.value)}
        >
          <option value="" disabled>
            Pilih Tugas Besar
          </option>
          <For each={tubesList()}>
            {(tb) => (
              <option value={tb.id_tubes}>{tb.topik_tubes}</option>
            )}
          </For>
        </select>
      </div>

      {/* Nilai Container */}
      <div class="flex-1 flex items-center justify-center mt-4">
        <Show when={selectedTubes()}>
          <div class="flex flex-col items-center">
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
