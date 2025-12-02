import { For } from "solid-js";

export default function KomponenList(props) {
  const komponen = () => props.data || [];

  return (
    <table class="w-full mt-5 border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">ID Komponen</th>
          <th class="p-2 border">Nama Komponen</th>
          <th class="p-2 border">Bobot</th>
          <th class="p-2 border">Aksi</th>
        </tr>
      </thead>

      <tbody>
        <For each={komponen()}>
          {(item) => (
            <tr>
              <td class="border p-2">{item.id_komponen}</td>
              <td class="border p-2">{item.nama_komponen}</td>
              <td class="border p-2">{item.bobot_komponen}%</td>
              <td class="border p-2">
                <button class="text-blue-500 mr-3" onClick={() => props.onEdit(item)}>Edit</button>
                <button class="text-red-500" onClick={() => props.onDelete(item.id_komponen)}>Hapus</button>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
