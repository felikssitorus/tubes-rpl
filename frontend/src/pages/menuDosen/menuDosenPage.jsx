import { createResource } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { getTubes } from "../../services/TubesService";
import Header from "../../components/layout/Header";

export default function TubesMenuPage() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [tubes] = createResource(() => getTubes(params.id_tubes));

  const menus = [
    { 
      title: "KELOLA KELOMPOK TUGAS BESAR", 
      path: `/dosen/tubes/${params.id_tubes}/kelompok`,
    },
    { 
      title: "KELOLA KOMPONEN PENILAIAN", 
      path: `/dosen/tubes/${params.id_tubes}/komponen`,
    },
    { 
      title: "PENILAIAN", 
      path: `/dosen/tubes/${params.id_tubes}/nilai`,
    },
  ];

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main class="px-4 pt-6 pb-20">
        <div class="mb-8">
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            MATA KULIAH : {tubes()?.nama_mata_kuliah || "Loading..."}
          </h2>
        </div>

        <div class="flex flex-col items-center gap-4 max-w-4xl mx-auto">
          {menus.map((menu) => (
            <button
              onClick={() => navigate(menu.path)}
              class="w-full bg-[#5a72d4] hover:bg-[#4a62c4] text-white py-5 px-6 rounded-xl font-semibold text-center uppercase transition-all shadow-md hover:shadow-lg"
            >
              {menu.title}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}