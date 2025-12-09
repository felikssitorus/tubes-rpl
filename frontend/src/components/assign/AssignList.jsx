import { For, Show, createSignal } from "solid-js";

export default function AssignList(props) {
  const mahasiswa = () => props.data || [];
  const kelompok = () => props.kelompok || [];
  
  const [assignments, setAssignments] = createSignal({});

  const handleSelectKelompok = (npm, id_kelompok) => {
    setAssignments({
      ...assignments(),
      [npm]: parseInt(id_kelompok)
    });
  };

  const getSelectedKelompok = (npm) => {
    return assignments()[npm] || "";
  };

  props.onAssignmentsChange && props.onAssignmentsChange(assignments);

  return (
    <div class="space-y-3">
      <Show when={mahasiswa().length === 0}>
        <div class="text-center py-12 text-gray-400">
          <p>Semua mahasiswa sudah di-assign ke kelompok.</p>
        </div>
      </Show>

      <For each={mahasiswa()}>
        {(mhs) => (
          <div class="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-[#465EBE] text-white rounded-full flex items-center justify-center font-bold">
                {mhs.nama.charAt(0)}
              </div>
              <div>
                <p class="font-medium text-gray-800">{mhs.nama}</p>
                <p class="text-sm text-gray-500">{mhs.npm}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <select
                value={getSelectedKelompok(mhs.npm)}
                onChange={(e) => handleSelectKelompok(mhs.npm, e.target.value)}
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#465EBE] bg-white"
              >
                <option value="" disabled>Pilih Kelompok</option>
                <For each={kelompok()}>
                  {(kel) => (
                    <option value={kel.id_kelompok}>
                      {kel.nama_kelompok} ({kel.jumlah_anggota} orang)
                    </option>
                  )}
                </For>
              </select>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}