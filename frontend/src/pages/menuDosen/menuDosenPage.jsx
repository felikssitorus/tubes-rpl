import { createResource } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { getTubes } from"../../services/TubesService";

// ✅ BENAR - Header juga naik 2 level
import Header from "../../components/layout/Header";
export default function TubesMenuPage() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [tubes] = createResource(() => getTubes(params.id_tubes));

  const menus = [
    { 
      title: "Komponen Penilaian", 
      path: `/tubes/${params.id_tubes}/komponen`,
      color: "from-blue-500 to-blue-600"
    },
    { 
      title: "Daftar Kelompok", 
      path: `/tubes/${params.id_tubes}/kelompok`,
      color: "from-green-500 to-green-600"
    },
    { 
      title: "Input Nilai",
      path: `/tubes/${params.id_tubes}/nilai`,
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main class="max-w-6xl mx-auto px-4 pt-6 pb-20">
        <div class="mb-8">
          {/* <button 
            onClick={() => navigate(`/matkul/${tubes()?.id_matkul}/tubes`)}
            class="text-[#465EBE] hover:underline text-sm mb-2 flex items-center gap-1"
          >
            ← Kembali ke Daftar Tubes
          </button> */}
          <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {tubes()?.nama_matkul} - {tubes()?.nama_tubes}
          </h2>
          <h1 class="text-2xl font-bold text-[#465EBE]">Menu Tubes</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menus.map((menu) => (
            <button
              onClick={() => navigate(menu.path)}
              class={`bg-gradient-to-br ${menu.color} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left`}
            >
              <div class="text-5xl mb-4">{menu.icon}</div>
              <h3 class="text-2xl font-bold">{menu.title}</h3>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}