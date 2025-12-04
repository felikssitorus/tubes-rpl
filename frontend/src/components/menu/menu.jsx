import { For } from "solid-js";

const Menu = (props) => {
  const { courseInfo } = props;

  return (
    <div class="container mx-auto p-6 max-w-md">
      <div class="course-title text-lg font-bold mb-4">
        MATA KULIAH: {courseInfo.courseCode}
        <div class="course-info mt-2 p-3 rounded shadow bg-white">
          <p class="font-semibold">Dosen Pengajar :</p>
          <For each={courseInfo.lecturers}>
            {(dosen) => <p class="pl-2">{dosen}</p>}
          </For>
        </div>
      </div>

      <div class="menu-list flex flex-col gap-3 mt-4">
        <For each={courseInfo.menus}>
          {(menu) => (
            <button
              class="menu-item bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded shadow uppercase font-bold text-left transition transform hover:-translate-y-1"
              onClick={() => alert(`Navigasi ke halaman: ${menu.page}`)}
            >
              {menu.label}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default Menu;
