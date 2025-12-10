import { For } from "solid-js";

export default function RubrikList(props) {
  const rubrik = () => props.data || [];

  return (
    <table class="w-full mt-5 border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">NO</th>
          <th class="p-2 border">KOMPONEN PENILAIAN</th>
          <th class="p-2 border">CATATAN</th>
          <th class="p-2 border">PERSENTASE</th>
        </tr>
      </thead>

      <tbody>
        <For each={rubrik()}>
          {(item, index) => (
            <tr>
              <td class="border p-2">{index() + 1}</td>
              <td class="border p-2">{item.komponen_penilaian}</td>
              <td class="border p-2">{item.catatan}</td>
              <td class="border p-2">{item.persentase}%</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}