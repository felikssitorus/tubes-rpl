// import { createResource, For, Show } from "solid-js";
// import { getAllKelompokByTubes } from "../../services/kelompokService";
// import KelompokCard from "../../components/nilai/KelompokCard";

// const fetchKelompok = (id_tubes) => getAllKelompokByTubes(id_tubes);

// const KelompokListNilai = (props) => {
//   const [kelompok] = createResource(
//     () => props.id_tubes,
//     fetchKelompok
//   );

//   return (
//     <div class="mt-4">
//       <h2 class="text-xl font-semibold mb-4">
//         Daftar Kelompok
//       </h2>

//       <Show
//         when={!kelompok.loading}
//         fallback={<p>Loading kelompok...</p>}
//       >
//         <Show
//           when={kelompok()?.length > 0}
//           fallback={<p>Belum ada kelompok.</p>}
//         >
//           <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <For each={kelompok()}>
//               {(k) => <KelompokCard kelompok={k} />}
//             </For>
//           </div>
//         </Show>
//       </Show>
//     </div>
//   );
// };

// export default KelompokListNilai;
