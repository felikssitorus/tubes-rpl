import { For, Show } from "solid-js";

export default function KelompokList(props) {
  const kelompok = () => props.data || [];

  return (
    <div class="space-y-4 mt-5">
      <For each={kelompok()}>
        {(item) => (
          <div class="border rounded-lg p-6 bg-white">
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-gray-800">
                {item.nama_kelompok} ({item.anggota?.length || 0} Orang)
              </h3>
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
              <p class="text-sm text-gray-400 italic pt-2 border-t">Belum ada anggota</p>
            </Show>
          </div>
        )}
      </For>

      <Show when={kelompok().length === 0}>
        <div class="text-center py-12 text-gray-400">
          <p>Belum ada kelompok. Klik "Kelola Kelompok" untuk membuat kelompok.</p>
        </div>
      </Show>
    </div>
  );
}