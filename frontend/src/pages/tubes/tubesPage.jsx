// import { createSignal, createEffect } from "solid-js";

// export default function Tubes() {
//   const [data, setData] = createSignal([]);

//   createEffect(() => {
//     fetch("http://localhost:3000/tubes")
//       .then((res) => res.json())
//       .then(setData);
//   });

//   return (
//     <div>
//       <h1>Data Tubes</h1>
//       <ul>
//         {data().map((item) => (
//           <li>{item.jumlah_kelompok} - {item.anggota_per_kelompok}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
