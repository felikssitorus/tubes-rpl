import { createSignal, onMount, For } from "solid-js";
import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";

const Kelompok = ({ idMkDibuka, namaMahasiswa, npm }) => {
  const [tubesList, setTubesList] = createSignal([]);
  const [selectedTubes, setSelectedTubes] = createSignal(""); // tetap kosong saat mount
  const [kelompokData, setKelompokData] = createSignal({});
  const [selectedKelompok, setSelectedKelompok] = createSignal("");
  const [kelompokSaya, setKelompokSaya] = createSignal([]);
  const [isTubesLocked, setIsTubesLocked] = createSignal(false);

  // Load list topik tubes ketika komponen mount
  onMount(async () => {
    if (!idMkDibuka) return;

    try {
      const res = await axios.get(`${BASE_URL}/mk/${idMkDibuka}`);
      if (res.data?.tubes) {
        setTubesList(res.data.tubes);
        // tidak auto pilih topik pertama
      }
    } catch (err) {
      console.error("Gagal load tubes:", err);
    }
  });

  const handleSelectTubes = async (id_tubes) => {
    setSelectedTubes(id_tubes);
    setSelectedKelompok("");
    setKelompokSaya([]);
    setKelompokData({});
    setIsTubesLocked(false);

    try {
      // Ambil data kelompok untuk topik yang dipilih
      const kel = await axios.get(`${BASE_URL}/tubes/${id_tubes}`);
      setKelompokData(kel.data);

      // Ambil status is_locked dari tubesList
      const tubesInfo = tubesList().find(t => t.id_tubes == id_tubes);
      setIsTubesLocked(tubesInfo?.is_locked || false);

      // Ambil kelompok mahasiswa login
      const myGroup = await axios.get(`${BASE_URL}/tubes/${id_tubes}/mahasiswa/${npm}`);
      if (myGroup.data?.nama_kelompok) {
        setSelectedKelompok(myGroup.data.nama_kelompok);
        setKelompokSaya(myGroup.data.anggota?.map(a => a.nama) || []);
      }
    } catch (err) {
      console.error("Gagal load kelompok:", err);
    }
  };

  const handleJoinKelompok = async (kelompokName) => {
    if (!selectedTubes() || !kelompokName || !npm) return;

    const kel = kelompokData()[kelompokName];
    if (kel?.is_locked || isTubesLocked()) {
      alert("Kelompok sudah dikunci, tidak bisa pindah.");
      return;
    }
    if (kelompokName === selectedKelompok()) return;

    try {
      const res = await axios.post(`${BASE_URL}/join`, {
        idTubes: selectedTubes(),
        namaKelompok: kelompokName,
        npm
      });

      if (res.data?.message) {
        setSelectedKelompok(kelompokName);
        const anggota = [...(kelompokData()[kelompokName]?.anggota?.map(a => a.nama) || [])];
        if (!anggota.includes(namaMahasiswa)) anggota.push(namaMahasiswa);
        setKelompokSaya(anggota);
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Gagal join:", err);
      alert(err.response?.data?.message || "Gagal join kelompok");
    }
  };

  return (
    <div class="container mx-auto p-6 flex flex-col">
      {/* Dropdown Tubes */}
      <div class="w-8/9 max-w-5xl">
        <select
          class="w-full p-2 border border-black rounded"
          value={selectedTubes()}
          onChange={e => handleSelectTubes(e.target.value)}
        >
          <option value="" disabled selected>Pilih Topik Tugas Besar</option>
          <For each={tubesList()}>
            {(tube) => <option value={tube.id_tubes}>{tube.topik_tubes}</option>}
          </For>
        </select>
      </div>

      {/* Radio Kelompok */}
      <h1 class="mt-4 menu-item w-8/9 max-w-5xl text-xl font-bold p-4 text-white bg-[#637AB9] border border-black m-0">
        Pembagian Kelompok Tugas Besar {isTubesLocked() && "(Locked)"}
      </h1>
      <div class="menu-item w-8/9 max-w-5xl flex flex-col gap-2 p-4 border border-black">
        <For each={Object.keys(kelompokData())}>
          {(kelompokName) => {
            const kel = kelompokData()[kelompokName];
            return (
              <label class="flex items-center gap-2 cursor-pointer m-0">
                <input
                  type="radio"
                  name={`kelompok-${selectedTubes()}`}
                  value={kelompokName}
                  checked={selectedKelompok() === kelompokName}
                  onChange={() => handleJoinKelompok(kelompokName)}
                  disabled={kel?.is_locked || isTubesLocked()}
                />
                <span>{kelompokName} {kel?.is_locked || isTubesLocked() ? "(Locked)" : ""}</span>
              </label>
            );
          }}
        </For>
      </div>

      {/* Kelompok Saya */}
      <div class="mt-4">
        <h2 class="menu-item w-8/9 max-w-5xl text-white font-semibold bg-[#637AB9] p-4 mb-0">
          Kelompok Saya
        </h2>
        <ul class="list-disc list-inside p-4 mt-0 border border-black menu-item w-8/9 max-w-5xl">
          <For each={kelompokSaya()}>{(anggota) => <li>{anggota}</li>}</For>
        </ul>
      </div>
    </div>
  );
};

export default Kelompok;
