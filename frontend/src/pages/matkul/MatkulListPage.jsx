import { createResource, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { getAllMatkul } from "../../services/MatkulService";
import MatkulCard from "../../components/matkul/MatkulCard";
import Header from "../../components/layout/Header";

export default function MatkulListPage() {
  const navigate = useNavigate();
  const [data] = createResource(getAllMatkul);

  const handleCardClick = (matkul) => {
    navigate(`/dosen/matkul/${matkul.id_mk_dibuka}/tubes`);
  };

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main class="max-w-6xl mx-auto px-4 pt-6 pb-20">
        <div class="mb-6">
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Daftar Kelas</h2>
          <h1 class="text-2xl font-bold text-[#465EBE]">Mata Kuliah</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <For each={data()} fallback={<p class="text-gray-500">Tidak ada mata kuliah yang dibuka.</p>}>
            {(item) => (
              <MatkulCard item={item} onClick={handleCardClick} />
            )}
          </For>
        </div>

        <div class="mt-8 text-center text-gray-600">
          <p class="font-semibold">Tahun Akademik 2024</p>
          <p>Semester 1</p>
        </div>
      </main>
    </div>
  );
}