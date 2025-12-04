import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Dashboard = (props) => {
  const { mataKuliah } = props;
  const navigate = useNavigate();

  return (
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto">
        <For each={mataKuliah}>
          {(mk) => (
            <div
              class="class-card flex flex-col h-40 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:-translate-y-1"
              onClick={() =>
                navigate(`/menu/${encodeURIComponent(mk.nama_mata_kuliah)}`)
              }
            >
              <div class="flex-2 bg-gradient-to-b from-indigo-600 to-indigo-900"></div>
              <div class="flex-1 bg-gray-300 flex items-center justify-center font-bold text-black">
                {mk.nama_mata_kuliah}
              </div>
            </div>
          )}
        </For>
      </div>

      <div class="semester-info mt-6 p-4 bg-white rounded-lg shadow-md">
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
