// File: src/components/Kelompok.jsx
import { createSignal, onMount, For } from "solid-js";
import axios from "axios";

const BASE_URL = "http://localhost:5000/kelompok";
const TUBES_URL = "http://localhost:5000/tubes/mk";

const Kelompok = ({ idMkDibuka, namaMahasiswa, npm }) => {
  const [tubesList, setTubesList] = createSignal([]);
  const [selectedTubes, setSelectedTubes] = createSignal("");

  const [kelompokData, setKelompokData] = createSignal({});
  const [selectedKelompok, setSelectedKelompok] = createSignal("");
  const [kelompokSaya, setKelompokSaya] = createSignal([]);

  if (!npm) {
    alert("Data user tidak ditemukan. Silakan login ulang.");
  }

  // ===============================
  // LOAD LIST TUBES BERDASARKAN MK
  // ===============================
  onMount(async () => {
    if (!idMkDibuka) return;

    try {
      const tubesRes = await axios.get(`${TUBES_URL}/${idMkDibuka}`);
      if (tubesRes.data?.tubes) {
        setTubesList(tubesRes.data.tubes);
      }
    } catch (err) {
      console.error("Gagal mengambil data tubes:", err);
      alert("Gagal mengambil daftar topik tubes.");
    }
  });

  // =========================
  // SAAT USER PILIH TUBES
  // =========================
  const handleSelectTubes = async (id_tubes) => {
    setSelectedTubes(id_tubes);
    setSelectedKelompok("");
    setKelompokSaya([]);
    setKelompokData({});

    try {
      const kel = await axios.get(`${BASE_URL}/tubes/${id_tubes}`);
      // Kalau data kosong, buat placeholder agar radio button tetap muncul
      if (Object.keys(kel.data).length === 0) {
        setKelompokData({ "Belum ada kelompok": [] });
      } else {
        setKelompokData(kel.data);
      }

      const myGroup = await axios.get(`${BASE_URL}/tubes/${id_tubes}/mahasiswa/${npm}`);
      if (myGroup.data?.nama_kelompok) {
        setSelectedKelompok(myGroup.data.nama_kelompok);
        setKelompokSaya(myGroup.data.anggota?.map(a => a.nama) || []);
      }
    } catch (err) {
      console.error("Gagal load kelompok:", err);
      setKelompokData({ "Belum ada kelompok": [] });
    }
  };

  // =========================
  // JOIN KELOMPOK
  // =========================
  const handleJoinKelompok = async (kelompokName) => {
    if (!selectedTubes() || !kelompokName || !npm) {
      alert("Data untuk join kelompok tidak lengkap!");
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
    <div class="container mx-auto p-6 flex flex-col">

      {/* Dropdown Topik Tubes */}
      <div class="w-8/9 max-w-5xl">
        <select
          class="w-full p-2 border border-black rounded"
          value={selectedTubes()}
          onChange={(e) => handleSelectTubes(e.target.value)}
        >
          <option value="" disabled>Pilih Topik Tugas Besar</option>
          <For each={tubesList()}>
            {(tube) => (
              <option value={tube.id_tubes}>{tube.topik_tubes}</option>
            )}
          </For>
        </select>
      </div>

      <h1 class="mt-4 menu-item w-8/9 max-w-5xl text-xl font-bold p-4 text-white 
               bg-[#637AB9] border border-black m-0">
        Pembagian Kelompok Tugas Besar
      </h1>

      {/* Radio Kelompok */}
      <div class="menu-item w-8/9 max-w-5xl flex flex-col gap-2 p-4 border border-black">
        <For each={Object.keys(kelompokData())}>
          {(kelompokName) => (
            <label class="flex items-center gap-2 cursor-pointer m-0">
              <input
                type="radio"
                name={`kelompok-${selectedTubes()}`} // unik per tubes
                value={kelompokName}
                checked={selectedKelompok() === kelompokName}
                onChange={() => handleJoinKelompok(kelompokName)}
                disabled={kelompokName === "Belum ada kelompok"} // disable jika placeholder
              />
              <span>{kelompokName}</span>
            </label>
          )}
        </For>
      </div>

      {/* Kelompok Saya */}
      <div class="mt-4">
        <h2 class="menu-item w-8/9 max-w-5xl text-white font-semibold
        bg-[#637AB9] p-4 mb-0">
          Kelompok Saya
        </h2>

        <ul class="list-disc list-inside p-4 mt-0 border border-black menu-item w-8/9 max-w-5xl">
          <For each={kelompokSaya()}>
            {(anggota) => <li>{anggota}</li>}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default Kelompok;
