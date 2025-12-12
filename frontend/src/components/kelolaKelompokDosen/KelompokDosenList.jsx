import { For, Show } from "solid-js";

export default function KelompokDosenList(props) {
  const kelompok = () => props.data || [];
  const isLocked = () => props.isLocked || false;

  return (
    <div class="space-y-4 mt-5">
      <For each={kelompok()}>
        {(item) => (
          <div class="border rounded-lg p-6 bg-white">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">
                {item.nama_kelompok} ({item.anggota?.length || 0} / {item.max_anggota || 4} Orang)
              </h3>
              <Show when={!isLocked()}>
                <button
                  onClick={() => props.onEditKelompok(item.id_kelompok)}
                  class="px-3 py-1.5 text-sm bg-[#465EBE] text-white rounded-lg hover:bg-[#3b4fa8] transition-colors"
                > Edit</button>
              </Show>
            </div>

            <Show when={item.anggota && item.anggota.length > 0}>
              <div class="border-t pt-4">
                <p class="text-sm font-medium text-gray-600 mb-3">Anggota Kelompok:</p>
                <ul class="space-y-2">
                  <For each={item.anggota}>
                    {(anggota) => (
                      <li class="flex items-center gap-2 text-gray-700">
                        <span class="w-2 h-2 bg-[#465EBE] rounded-full"></span>
                        <span>{anggota.nama} ({anggota.npm})</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>

            <Show when={!item.anggota || item.anggota.length === 0}>
              <p class="text-sm text-gray-400 pt-2 border-t">Belum ada anggota</p>
            </Show>
          </div>
        )}
      </For>

    </div>
  );
}