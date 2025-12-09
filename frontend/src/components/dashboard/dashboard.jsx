import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Dashboard = (props) => {
  const { mataKuliah } = props;
  const navigate = useNavigate();

  return (
    <div class="p-6">
      {/* Grid Kartu Mata Kuliah */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
        <For each={mataKuliah}>
          {(mk) => (
            <div
              class="class-card flex flex-col h-40 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              style="background: linear-gradient(to bottom, #465EBE, #212C58);"
              onClick={() =>
                navigate(`/menu/${encodeURIComponent(mk.nama_mata_kuliah)}`)
              }
            >
              <div class="flex-1 flex items-center justify-center font-bold text-white text-lg px-2 text-center">
                {mk.nama_mata_kuliah}
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Informasi Semester */}
      <div class="semester-info mt-6 p-4 bg-white rounded-lg shadow-lg">
        <For each={mataKuliah}>
          {(mk) => (
            <p>
              {mk.nama_mata_kuliah} - Semester {mk.semester}, {mk.tahun}, Kelas {mk.kelas}
            </p>
          )}
        </For>
      </div>
    </div>
  );
};

export default Dashboard;
