import { createSignal, onMount, For, Show } from "solid-js";
import axios from "axios";

export default function Nilai({ npm, idTubes }) {
  const [nilaiList, setNilaiList] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  const loadNilai = async () => {
    if (!npm || !idTubes) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/nilai-mhs/${npm}/tubes/${idTubes}`
      );
      setNilaiList(res.data || []);
    } catch (err) {
      console.error("Gagal fetch nilai:", err);
      setNilaiList([]);
    }
    setLoading(false);
  };

  onMount(loadNilai);

  return (
    <div class="flex flex-col items-center justify-center w-full">
      <div class="bg-white border-2 border-[#071755] rounded-lg shadow-md w-80">
        <Show
          when={!loading()}
          fallback={<p class="text-gray-500 p-4 text-center">Loading...</p>}
        >
          <ul class="list-none m-0 p-0">
            <For each={nilaiList()}>
              {(item, index) => (
                <li
                  class={`flex justify-between items-center px-0 py-4 text-[#071755] text-lg ${
                    index() !== nilaiList().length - 1 ? "border-b border-[#071755]" : ""
                  }`}
                >
                  <span class="flex-1 text-left font-medium px-4 border-r border-[#071755]">
                    {item.nama_komponen}
                  </span>
                  <span class="flex-1 text-center font-bold px-4">
                    {item.nilai}
                  </span>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </div>
  );
}
