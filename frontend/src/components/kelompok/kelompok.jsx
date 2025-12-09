import { createSignal, onMount, For } from "solid-js";
import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";
const TUBES_URL = "http://localhost:5000/tubes/mk"; // endpoint topik tubes

const Kelompok = ({ idMkDibuka, namaMahasiswa, npm }) => {
  const [kelompokData, setKelompokData] = createSignal({});
  const [kelompokSaya, setKelompokSaya] = createSignal([]);
  const [selectedKelompok, setSelectedKelompok] = createSignal("");

  const [tubesList, setTubesList] = createSignal([]);
  const [selectedTubes, setSelectedTubes] = createSignal("");

  if (!npm) {
    alert("Data user tidak ditemukan. Silakan login ulang.");
  }

  onMount(async () => {
    if (!idMkDibuka || !npm) return;

    try {
      // Fetch data kelompok
      const { data } = await axios.get(`${BASE_URL}/${idMkDibuka}`);
      setKelompokData(data);

      const resMyGroup = await axios.get(`${BASE_URL}/${idMkDibuka}/mahasiswa/${npm}`);
      if (resMyGroup.data) {
        const myGroupName = resMyGroup.data.nama_kelompok;
        setSelectedKelompok(myGroupName);

        const anggota = data[myGroupName]?.map(a => a.nama) || [];
        setKelompokSaya([...anggota]);
      }

      // Fetch topik tubes
      const tubesRes = await axios.get(`${TUBES_URL}/${idMkDibuka}`);
      if (tubesRes.data?.tubes) {
        setTubesList(tubesRes.data.tubes);
      }
    } catch (err) {
      console.error("Gagal load data kelompok atau tubes:", err);
      alert("Gagal mengambil data. Refresh halaman.");
    }
  });

  const handleJoinKelompok = async (kelompokName) => {
    if (!idMkDibuka || !kelompokName || !npm) {
      alert("Data untuk join kelompok tidak lengkap!");
      return;
    }

    if (kelompokName === selectedKelompok()) return;

    try {
      const res = await axios.post(`${BASE_URL}/join`, {
        idMkDibuka,
        namaKelompok: kelompokName,
        npm
      });

      if (res.data?.message) {
        setSelectedKelompok(kelompokName);

        const anggota = [...(kelompokData()[kelompokName]?.map(a => a.nama) || [])];
        if (!anggota.includes(namaMahasiswa)) anggota.push(namaMahasiswa);
        setKelompokSaya(anggota);

        alert(res.data.message);
      }
    } catch (err) {
      console.error("Gagal join kelompok:", err);
      const msg = err.response?.data?.message || "Terjadi kesalahan saat join kelompok";
      alert(msg);
    }
  };

  return (
    <div class="container mx-auto p-6 flex flex-col ">

      {/* Dropdown Topik Tubes */}
      <div class="w-8/9 max-w-5xl">
        <select
          class="w-full p-2 border border-black rounded"
          value={selectedTubes()}
          onChange={(e) => setSelectedTubes(e.target.value)}
        >
          <option value="" disabled selected>Tubes</option>
          <For each={tubesList()}>
            {(tube) => (
              <option value={tube.id_tubes}>{tube.topik_tubes}</option>
            )}
          </For>
        </select>
      </div>

      {/* Judul dengan gradient dan border */}
      <h1
        class="mt-4 menu-item w-8/9 max-w-5xl text-xl font-bold p-4 text-white 
               bg-[#637AB9]
               border border-black m-0"
      >
        Pembagian Kelompok Tugas Besar
      </h1>

      {/* Radio Button Vertical dengan border dan border-radius */}
      <div class="  menu-item w-8/9 max-w-5xl flex flex-col gap-2 p-4 border border-black">
        <For each={Object.keys(kelompokData())}>
          {(kelompokName) => (
            <label class="flex items-center gap-2 cursor-pointer m-0">
              <input
                type="radio"
                name="kelompok"
                value={kelompokName}
                checked={selectedKelompok() === kelompokName}
                onChange={() => handleJoinKelompok(kelompokName)}
                class="form-radio"
              />
              <span>{kelompokName}</span>
            </label>
          )}
        </For>
      </div>

      {/* Kelompok Saya dengan jarak dan gradient */}
      <div class="mt-4">
        <h2 class="menu-item w-8/9 max-w-5xl text-white font-semibold
        bg-[#637AB9]
        p-4 mb-0">Kelompok Saya</h2>
        <ul class="list-disc list-inside
        p-4
        mt-0
        border border-black
        menu-item w-8/9 max-w-5xl">
          <For each={kelompokSaya()}>
            {(anggota) => <li>{anggota}</li>}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default Kelompok;